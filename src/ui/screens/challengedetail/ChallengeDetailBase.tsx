import {Models} from "../../../core";
import {BaseScreen, BaseScreenProps, BaseScreenState} from "../BaseScreen";
import {action, observable} from "mobx";
import {FetchChallengeIdeasStatus} from "core/store/IdeaState";
import {UnauthenticatedDropdown} from "../../components";
import * as React from "react";
import {Variables} from "../../style";

export interface ChallengeDetailProps extends BaseScreenProps {}

export interface ChallengeDetailState extends BaseScreenState {}

export abstract class ChallengeDetailBase extends BaseScreen<ChallengeDetailProps, ChallengeDetailState> {
  protected challenge: Models.Challenge;

  protected isNavigating = false;

  @observable
  protected fetchChallengeIdeasStatus: FetchChallengeIdeasStatus;

  public static navigationOptions = ({navigation}: any) => {
    const {params} = navigation.state;

    return {
      headerTitle: "CHALLENGE",
      headerTitleStyle: {
        color: Variables.whiteColor,
        fontSize: 20,
      },
      headerStyle: {
        paddingTop: 10,
        backgroundColor: Variables.primaryColor,
        borderBottomWidth: 0,
      },
      headerTintColor: Variables.whiteColor,
      headerRight: params && params.headerRight,
    };
  };

  constructor(props: ChallengeDetailProps) {
    super(props);

    const {navigation} = this.props;
    this.challenge = navigation.getParam("challenge");
  }

  public async componentDidMount(): Promise<void> {
    const {navigation} = this.props;
    const {userState} = this.dataStore;
    const {isAuthenticated} = userState;

    this.fetchChallengeIdeas();

    if (!isAuthenticated) {
      navigation.setParams({
        headerRight: <UnauthenticatedDropdown />,
      });
    }
  }

  protected fetchChallengeIdeas = async () => {
    const {challenge} = this;
    const {ideaState} = this.dataStore;

    this.setFetchChallengeIdeasStatus({isLoading: true});
    this.setFetchChallengeIdeasStatus(await ideaState.fetchChallengeIdeas({challenge}));
  };

  protected handlePageBlur = () => {
    this.isNavigating = false;
  };

  @action
  protected setFetchChallengeIdeasStatus(fetchChallengeIdeasStatus: FetchChallengeIdeasStatus) {
    this.fetchChallengeIdeasStatus = fetchChallengeIdeasStatus;
  }

  protected handleViewIdeas = () => {
    const {challenge} = this;
    const {navigationState} = this.appStore;

    if (this.isNavigating) return;
    this.isNavigating = true;

    navigationState.navigateToIdeasPager({challenge});
  };

  protected handleAddIdea = () => {
    const {challenge} = this;
    const {userState} = this.dataStore;
    const {navigationState} = this.appStore;

    if (this.isNavigating) return;
    this.isNavigating = true;

    if (userState.isAuthenticated) navigationState.navigateToNewIdea({challenge});
    else
      navigationState.navigateToSignIn({
        onSuccess: () => {
          navigationState.navigateToHome();
          navigationState.navigateToChallengeDetail(challenge);
          navigationState.navigateToNewIdea({challenge});
        },
      });
  };
}
