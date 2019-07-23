import * as _ from "lodash";
import * as React from "react";
import {BaseScreen, BaseScreenProps, BaseScreenState} from "../BaseScreen";
import {Alert, View} from "react-native";
import {Errors, Models} from "../../../core";
import {style} from "./AccountStyles";
import ImagePicker from "react-native-image-picker";
import {AppText, UnauthenticatedDropdown} from "../../components";
import {ReactNativeFile} from "extract-files";
import moment from "moment";
import {action, computed, observable, runInAction} from "mobx";
import {FetchMyChallengesStatus, FetchUserChallengesStatus} from "core/store/ChallengeState";
import {FetchIdeasWithMyReactionStatus, FetchIdeasWithUserReactionStatus, FetchMyIdeasStatus, FetchUserIdeasStatus} from "core/store/IdeaState";
import {Variables} from "../../style";
import Icon from "react-native-vector-icons/Feather";
import PopoverTooltip from "react-native-popover-tooltip";
import {Observer} from "mobx-react";

export enum ProfileTab {
  Challenges = "challenges",
  Ideas = "ideas",
  Likes = "likes",
}

export interface AccountProps extends BaseScreenProps {
  test: boolean;
}

export interface AccountState extends BaseScreenState {
  isEditing?: boolean;
  name?: string;
  userImageKey: number;
  updatingUserImage: boolean;

  activeTab: ProfileTab;

  userInfo: {
    isLoading: boolean;
    error?: Errors.GenericError | Errors.UserNotAuthenticatedError;
  };
}

export abstract class AccountBase extends BaseScreen<AccountProps, AccountState> {
  public state: AccountState = {
    isEditing: false,
    name: "",
    userImageKey: moment().valueOf(),
    updatingUserImage: false,
    activeTab: ProfileTab.Challenges,
    userInfo: {},
  } as AccountState;

  protected userParam: Models.User;

  @observable private userChallengesInfo: FetchUserChallengesStatus | undefined;

  @computed
  protected get challengesInfo(): FetchUserChallengesStatus | FetchMyChallengesStatus | undefined {
    const {isMe} = this;
    const {fetchMyChallengesStatus} = this.dataStore.challengeState;

    return isMe ? fetchMyChallengesStatus : this.userChallengesInfo;
  }

  @observable private userIdeasInfo: FetchUserIdeasStatus | undefined;

  @computed
  protected get ideasInfo(): FetchUserIdeasStatus | FetchMyIdeasStatus | undefined {
    const {isMe} = this;
    const {fetchMyIdeasStatus} = this.dataStore.ideaState;

    return isMe ? fetchMyIdeasStatus : this.userIdeasInfo;
  }

  @observable private userReactedIdeasInfo: FetchUserIdeasStatus | undefined;

  @computed
  protected get reactedIdeasInfo(): FetchIdeasWithUserReactionStatus | FetchIdeasWithMyReactionStatus | undefined {
    const {isMe} = this;
    const {fetchIdeasWithMyReactionStatus} = this.dataStore.ideaState;

    return isMe ? fetchIdeasWithMyReactionStatus : this.userReactedIdeasInfo;
  }

  @observable
  protected isTooltipOpen = false;

  protected isMe: boolean;

  public static navigationOptions = ({navigation}: any) => {
    const {params} = navigation.state;

    return {
      headerTitle: "PROFILE",
      headerTitleStyle: {
        color: Variables.whiteColor,
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: Variables.primaryColor,
        borderBottomWidth: 0,
        elevation: 0,
      },
      headerTintColor: Variables.whiteColor,
      headerRight: params && params.headerRight,
    };
  };

  constructor(props: AccountProps) {
    super(props);

    const {navigation} = this.props;
    const {userState} = this.dataStore;
    this.userParam = navigation.getParam("user");

    this.isMe = _.isNil(this.userParam) || (!_.isNil(userState.currentUser) && userState.currentUser.id === this.userParam.id);
  }

  @action
  protected setUserParam(user: Models.User) {
    this.userParam = user;
  }

  public async componentDidMount() {
    const {isMe} = this;
    const {navigation} = this.props;
    const {userState} = this.dataStore;
    const {navigationState} = this.appStore;
    const {isAuthenticated} = userState;

    if (isMe) await userState.fetchMe();

    if (isMe)
      navigation.setParams({
        headerRight: (
          <Observer>
            {() => {
              const {isTooltipOpen} = this;

              return (
                <PopoverTooltip
                  setBelow={false}
                  onOpenTooltipMenu={this.handleOpenTooltipMenu}
                  onCloseTooltipMenu={this.handleCloseTooltipMenu}
                  tooltipContainerStyle={{marginTop: -15, paddingRight: 10}}
                  buttonComponent={
                    <View style={style.popoverButtonContainer}>
                      <Icon name={isTooltipOpen ? "x" : "more-vertical"} color={Variables.whiteColor} size={25} style={style.popoverButton} />
                    </View>
                  }
                  items={[
                    {
                      label: () => <AppText style={style.popoverItemLogOut}>About</AppText>,
                      onPress: () => navigationState.navigateToAbout(),
                    },
                    {
                      label: () => <AppText style={style.popoverItemLogOut}>Log out</AppText>,
                      onPress: this.handleLogOutPress,
                    },
                  ]}
                />
              );
            }}
          </Observer>
        ),
      });
    else if (!isAuthenticated) {
      navigation.setParams({
        headerRight: <UnauthenticatedDropdown />,
      });
    }

    if (!isMe) this.fetchUser();
    this.fetchChallenges();
    this.fetchIdeas();
    this.fetchIdeasWithReactions();
  }

  @action.bound
  protected handleOpenTooltipMenu() {
    this.isTooltipOpen = true;
  }

  @action.bound
  protected handleCloseTooltipMenu() {
    this.isTooltipOpen = false;
  }

  protected fetchUser = async (): Promise<void> => {
    const {userParam, isMe} = this;
    const {userState} = this.dataStore;

    this.setState({userInfo: {isLoading: true}});

    if (isMe) {
      const response = await userState.fetchMe();

      this.setState({
        userInfo: {
          error: response.error,
          isLoading: false,
        },
      });
    } else {
      const response = await userState.fetchUser({
        id: userParam.id,
      });

      this.setState({
        userInfo: {
          isLoading: false,
          error: response.error,
        },
      });

      if (!_.isNil(response.user)) this.setUserParam(response.user);
    }
  };

  protected fetchChallenges = () => {
    const {userParam} = this;
    const {isMe} = this;
    const {challengeState} = this.dataStore;

    if (isMe) challengeState.fetchMyChallenges();
    else
      challengeState
        .fetchUserChallenges({
          user: userParam,
        })
        .then(response => {
          runInAction(() => (this.userChallengesInfo = response));
        });
  };

  protected fetchIdeas = () => {
    const {userParam, isMe} = this;
    const {ideaState} = this.dataStore;

    if (isMe) ideaState.fetchMyIdeas();
    else
      ideaState
        .fetchUserIdeas({
          user: userParam,
        })
        .then(response => {
          runInAction(() => (this.userIdeasInfo = response));
        });
  };

  protected fetchIdeasWithReactions = () => {
    const {userParam, isMe} = this;
    const {ideaState, userState} = this.dataStore;
    const {currentUser} = userState;

    if (isMe) ideaState.fetchIdeasWithMyReaction();
    else
      ideaState.fetchIdeasWithUserReaction({user: isMe ? currentUser! : userParam}).then(response => {
        runInAction(() => (this.userReactedIdeasInfo = response));
      });
  };

  protected handleLogOutPress = () => {
    this.appStore.signOut();
  };

  protected handleShowChallenges = () => {
    this.setState({activeTab: ProfileTab.Challenges});
  };

  protected handleShowIdeas = () => {
    this.setState({activeTab: ProfileTab.Ideas});
  };

  protected handleShowLikes = () => {
    this.setState({activeTab: ProfileTab.Likes});
  };

  protected handleEdit = () => {
    const currentUser = this.dataStore.userState.currentUser;

    this.setState({isEditing: true, name: currentUser!.name});
  };

  protected handleSelectImage = () => {
    const {userState} = this.dataStore;

    const options = {
      title: "Upload a picture!",
      storageOptions: {
        skipBackup: true,
        path: "images",
      },
      allowsEditing: true,
    };

    ImagePicker.showImagePicker(options, response => {
      if (response.error) {
        Alert.alert("Error", "There was an error uploading your image. Please try again");
      } else if (!response.didCancel) {
        this.setState({updatingUserImage: true});

        const fileName = !_.isNil(response.fileName) ? response.fileName : response.uri.lastIndexOf("/") > 0 ? response.uri.substring(response.uri.lastIndexOf("/")) : "filename";

        const image = !_.isNil(response.uri)
          ? new ReactNativeFile({
              uri: response.uri,
              name: fileName,
              type: response.type!,
            })
          : undefined;

        userState.updateMe({image}).then(updateMeResponse => {
          this.setState({
            updatingUserImage: false,
            userImageKey: moment().valueOf(),
            userInfo: {
              isLoading: false,
              error: updateMeResponse.error,
            },
          });

          if (!updateMeResponse.success) alert("There was an error trying to upload your picture.");
        });
      }
    });
  };

  protected handleSave = () => {
    const {userState} = this.dataStore;
    const {name} = this.state;

    userState.updateMe({name}).then(response => {
      if (!response.success) Alert.alert("Error", "There was an error updating your profile. Please try again later.");

      this.setState({
        userInfo: {
          isLoading: false,
          error: response.error,
        },
        isEditing: false,
      });
    });
  };

  protected handleCancelEdit = () => {
    this.setState({isEditing: false});
  };

  protected handleChangeName = (name: string) => {
    this.setState({name: name});
  };
}
