import * as _ from "lodash";
import {BaseComponent, BaseComponentProps, BaseComponentState} from "../../../../BaseComponent";
import {Models} from "../../../../../core";
import {StyleSheet} from "react-native";

export interface IdeaDetailProps extends BaseComponentProps {
  idea: Models.Idea;
  style?: StyleSheet.NamedStyles<any>;
}

export interface IdeaDetailState extends BaseComponentState {
  isLoading: boolean;
  success?: boolean;

  isChangingValue: boolean;
}

export class IdeaDetailBase extends BaseComponent<IdeaDetailProps, IdeaDetailState> {
  public state: IdeaDetailState = {
    isLoading: false,
    isChangingValue: false,
  };

  public componentDidMount(): void {
    const {idea} = this.props;

    if (_.isNil(idea.createdBy)) this.fetchIdea();
  }

  protected fetchIdea = async () => {
    const {idea} = this.props;
    const {isLoading} = this.state;
    const {ideaState} = this.dataStore;

    if (isLoading) return;

    this.setState({success: undefined, isLoading: true});

    const {success} = await ideaState.fetchIdea({idea});

    this.setState({success, isLoading: false});
  };

  protected handleReactionPress = async () => {
    const {idea} = this.props;
    const {isChangingValue} = this.state;
    const {userState, reactionState} = this.dataStore;
    const {navigationState} = this.appStore;
    const {isAuthenticated} = userState;

    if (!isAuthenticated) {
      const {challenge} = idea;

      if (!_.isNil(challenge))
        navigationState.navigateToSignIn({
          onSuccess: () => {
            navigationState.navigateToHome();
            navigationState.navigateToChallengeDetail(challenge);
          },
        });

      return;
    }

    if (isChangingValue) return;

    this.setState({isChangingValue: true});

    if (_.isNil(idea.myReaction)) await reactionState.createIdeaReaction({idea});
    else await reactionState.deleteIdeaReaction({idea});

    this.setState({isChangingValue: false});
  };
}
