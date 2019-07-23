import {BaseScreen, BaseScreenProps} from "../BaseScreen";
import {observer} from "mobx-react";
import {ViewPager} from "rn-viewpager";
import * as React from "react";
import * as _ from "lodash";
import * as Models from "../../../core/models";
import {IdeaDetail} from "./components/ideadetail/IdeaDetail";
import {ActivityIndicator, Alert, Image, SafeAreaView, TouchableOpacity, View, ViewPagerAndroidOnPageScrollEventData} from "react-native";
import {style} from "./IdeasPagerStyles";
import {AppText, Fade, UnauthenticatedDropdown} from "../../components";
import {AppButton} from "../../components/appbutton";
import {Variables} from "../../style";
import Icon from "react-native-vector-icons/Feather";
import {action, autorun, observable, runInAction} from "mobx";
import PopoverTooltip from "react-native-popover-tooltip";
import arrowLeft from "../../assets/arrow-left.png";
import arrowRight from "../../assets/arrow-right.png";

export interface IdeasPagerState {
  isLoading: boolean;
  success?: boolean;
  initialPage?: number;
  isTooltipOpen: boolean;
  showArrows: boolean;
}

@observer
export class IdeasPager extends BaseScreen<BaseScreenProps, IdeasPagerState> {
  protected controls = {viewPager: React.createRef<ViewPager>()};
  protected challenge: Models.Challenge;
  protected idea: string | Models.Idea | undefined;
  protected authListener: (() => void) | undefined;
  protected navigation = this.props.navigation;

  @observable
  protected currentPage = 0;

  state: IdeasPagerState = {
    isLoading: false,
    isTooltipOpen: false,
    showArrows: true,
  };

  protected touchEndTimeout: any;

  public static navigationOptions = ({navigation}: any) => {
    const {params} = navigation.state;

    return {
      headerTitle: "IDEA",
      headerTitleStyle: {
        color: Variables.whiteColor,
        fontSize: 20,
      },
      headerStyle: {
        paddingTop: 10,
        backgroundColor: Variables.primaryColor,
      },
      headerTintColor: Variables.whiteColor,
      headerRight: params && params.headerRight,
    };
  };

  constructor(props: BaseScreenProps) {
    super(props);

    const {navigation} = this.props;
    this.challenge = navigation.getParam("challenge");
    this.idea = navigation.getParam("idea");
  }

  public async componentDidMount(): Promise<void> {
    const {challenge} = this;

    this.authListener = autorun(() => this.handleNavigationOptions());

    if (_.isNil(challenge.ideas) || challenge.ideas.length === 0) this.fetchChallengeIdeas();
    else {
      const {idea} = this;
      const initialPage = challenge.ideas.findIndex(i => i.id === (typeof idea === "object" ? idea.id : idea));

      if (initialPage !== -1) {
        this.setState({initialPage});
        runInAction(() => (this.currentPage = initialPage));
      }
    }
  }

  protected handleNavigationOptions() {
    const {challenge, currentPage, navigation} = this;
    const {isTooltipOpen} = this.state;
    const {currentUser, isAuthenticated} = this.dataStore.userState;
    const {ideas} = challenge;

    const currentIdea = !_.isNil(ideas) ? ideas[currentPage] : undefined;

    if (!isAuthenticated)
      navigation.setParams({
        headerRight: <UnauthenticatedDropdown />,
      } as any);
    else {
      const {createdBy: challengeCreator} = challenge;
      const ideaCreator = !_.isNil(currentIdea) ? currentIdea.createdBy : undefined;

      if (!_.isNil(currentUser) && ((!_.isNil(challengeCreator) && challengeCreator.id === currentUser.id) || (!_.isNil(ideaCreator) && ideaCreator.id === currentUser.id)))
        navigation.setParams({
          headerRight: (
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
              items={[{label: () => <AppText style={style.popoverItemDelete}>Delete idea</AppText>, onPress: this.handleDelete}]}
            />
          ),
        } as any);
      else
        navigation.setParams({
          headerRight: null,
        } as any);
    }
  }

  protected handleDelete = () => {
    const {challenge, currentPage} = this;
    const idea = !_.isNil(challenge) && !_.isNil(challenge.ideas) ? challenge.ideas[currentPage] : undefined;

    if (!_.isNil(idea)) setTimeout(() => Alert.alert("Delete idea", "Are you sure you want to delete this idea?", [{text: "Yes", onPress: () => this.deleteIdea(idea)}, {text: "Cancel"}], {cancelable: true}), 600);
  };

  protected async deleteIdea(idea: Models.Idea) {
    const {currentPage} = this;
    const {ideaState} = this.dataStore;
    const {navigationState} = this.appStore;

    const deleteResponse = await ideaState.deleteIdea({idea});

    if (!deleteResponse.success) setTimeout(() => Alert.alert("Could not delete idea", deleteResponse.error!.message), 600);
    else {
      if (this.challenge.ideas!.length !== 0) this.setCurrentPage(currentPage);
      else navigationState.goBack();
    }
  }

  protected handleOpenTooltipMenu = () => {
    this.setState({isTooltipOpen: true});
  };

  protected handleCloseTooltipMenu = () => {
    this.setState({isTooltipOpen: false});
  };

  @action.bound
  protected saveCurrentPage(e: ViewPagerAndroidOnPageScrollEventData) {
    this.currentPage = e.position;
  }

  @action
  protected setCurrentPage(index: number) {
    const {ideas} = this.challenge;
    const {viewPager} = this.controls;

    if (viewPager.current === null) return;

    const currentPage = Math.max(0, Math.min(index, !_.isNil(ideas) ? ideas.length - 1 : 0));
    this.currentPage = currentPage;
    viewPager.current.setPage(currentPage);
  }

  protected fetchChallengeIdeas = async () => {
    const {challenge} = this;
    const {isLoading} = this.state;
    const {ideaState} = this.dataStore;

    if (isLoading) return;

    this.setState({isLoading: true, success: undefined});

    const {success} = await ideaState.fetchChallengeIdeas({challenge});

    let initialPage;

    if (success) {
      const {idea} = this;
      initialPage = challenge.ideas.findIndex(i => i.id === (typeof idea === "object" ? idea.id : idea));

      if (initialPage === -1) initialPage = undefined;
    }

    this.setState({
      isLoading: false,
      success,
      initialPage,
    });
  };

  protected onPreviousImage = () => {
    const {currentPage} = this;
    this.setCurrentPage(currentPage - 1);
  };

  protected onNextImage = () => {
    const {currentPage} = this;
    this.setCurrentPage(currentPage + 1);
  };

  protected handleTouchStart = () => {
    this.setState({showArrows: false});

    if (this.touchEndTimeout) clearTimeout(this.touchEndTimeout);
  };

  protected handleTouchEnd = () => {
    if (this.touchEndTimeout) clearTimeout(this.touchEndTimeout);
    this.touchEndTimeout = setTimeout(() => this.setState({showArrows: true}), 1500);
  };

  public render() {
    const {challenge, currentPage} = this;
    const {isLoading, success, initialPage, showArrows} = this.state;
    const {ideas} = challenge;

    return (
      <SafeAreaView style={style.container}>
        {isLoading && (
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large" />
          </View>
        )}

        {!isLoading &&
          (!_.isNil(ideas) && ideas.length > 0 ? (
            <View style={{position: "relative", flex: 1}} onTouchStart={this.handleTouchStart} onTouchMove={this.handleTouchEnd} onTouchEnd={this.handleTouchEnd}>
              <ViewPager ref={this.controls.viewPager} key={initialPage} style={{flex: 1}} initialPage={initialPage} onPageSelected={this.saveCurrentPage}>
                {ideas.map(idea => (
                  <IdeaDetail key={idea.id} idea={idea} />
                ))}
              </ViewPager>

              {currentPage !== 0 && (
                <Fade visible={showArrows} style={{position: "absolute", width: 40, height: 250, top: 0, left: 0}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.onPreviousImage();
                    }}>
                    <Image source={arrowLeft} style={{width: "100%", height: "100%"}} resizeMode="contain" />
                  </TouchableOpacity>
                </Fade>
              )}

              {currentPage !== ideas.length - 1 && (
                <Fade visible={showArrows} style={{position: "absolute", width: 40, height: 250, top: 0, right: 0}}>
                  <TouchableOpacity onPress={this.onNextImage}>
                    <Image source={arrowRight} style={{width: "100%", height: "100%"}} resizeMode="contain" />
                  </TouchableOpacity>
                </Fade>
              )}
            </View>
          ) : success !== undefined && !success ? (
            <View style={{alignItems: "center", padding: 15}}>
              <AppText style={{textAlign: "center"}}>Could not get the ideas for this challenge.</AppText>

              <AppButton onPress={this.fetchChallengeIdeas} style={{width: "auto", marginTop: 20}}>
                Try again
              </AppButton>
            </View>
          ) : (
            success && (
              <View style={style.noIdeasContainer}>
                <AppText style={style.noIdeasText}>This challenge has no ideas.</AppText>
              </View>
            )
          ))}
      </SafeAreaView>
    );
  }
}
