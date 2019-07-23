import * as _ from "lodash";
import * as React from "react";
import {Models} from "../../core";
import {NavigationActions, NavigationContainer, NavigationContainerComponent, NavigationParams, NavigationStateRoute} from "react-navigation";
import {State} from "./State";
import {IImageInfo} from "react-native-image-zoom-viewer/src/image-viewer.type";
import uuidV4 from "uuid/v4";

export type NavigateToSignInOptions = {
  onSuccess?: () => void;
};

export type NavigateToNewIdeaOptions =
  | {
      challenge?: undefined;
      idea: Models.Idea;
    }
  | {
      challenge: Models.Challenge;
      idea?: undefined;
    };

export type NavigateToIdeasPagerOptions = {
  challenge: Models.Challenge;
  idea?: string | Models.Idea;
};

export class NavigationState extends State {
  public appContainer = React.createRef<NavigationContainerComponent>();

  protected navigate = (routeName: string, params?: NavigationParams, key?: string) => {
    this.appContainer.current!.dispatch(
      NavigationActions.navigate({
        routeName,
        params,
        key,
      })
    );
  };

  public goBack = () => this.appContainer.current!.dispatch(NavigationActions.back());

  public getActiveBottomTab(): "Home" | "NewChallenge" | "Account" {
    const {nav} = ((this.appContainer.current! as unknown) as NavigationContainer).state;
    const mainNavigator = (nav!.routes[0] as NavigationStateRoute<any>).routes.find(({routeName}) => routeName === "Authenticated")!;
    const currentRoute = (mainNavigator as NavigationStateRoute<any>).routes[mainNavigator.index];

    return currentRoute.routeName as "Home" | "NewChallenge" | "Account";
  }

  public navigateToHome = () => {
    const {authToken} = this.appStore.dataStore.userState;

    this.navigate(!_.isNil(authToken) ? "Home" : "UnauthenticatedHome");
  };

  public navigateToAccount = (user: Models.User) => {
    const {authToken} = this.appStore.dataStore.userState;

    let routeName: string;
    if (_.isNil(authToken)) {
      routeName = "UnauthenticatedAccount";
      this.navigate(routeName, {user}, `${routeName}-${user.id}`);
      return;
    }

    const activeBottomTab = this.getActiveBottomTab();
    routeName = `Authenticated${activeBottomTab}Account`;

    this.navigate(routeName, {user}, `${routeName}-${user.id}`);
  };

  public navigateToSignUp = () => this.navigate("SignUp");

  public navigateToSignIn = (options: NavigateToSignInOptions = {}) => this.navigate("SignIn", options);

  public navigateToAuthCheck = () => this.navigate("AuthCheck");

  public navigateToValidate = (email: string) => this.navigate("Validate", {email});

  public navigateToNewIdea = (options: NavigateToNewIdeaOptions) => {
    const activeBottomTab = this.getActiveBottomTab();

    if (activeBottomTab === "Account") this.navigate("AuthenticatedAccountNewIdea", options, `AuthenticatedAccountNewIdea`);
    else this.navigate("AuthenticatedHomeNewIdea", options, uuidV4());
  };

  public navigateToChallengeDetail = (challenge: Models.Challenge) => {
    const {dataStore} = this.appStore;
    const {userState} = dataStore;
    const {authToken} = userState;

    if (_.isNil(authToken)) {
      this.navigate("UnauthenticatedChallengeDetail", {challenge}, uuidV4());
      return;
    }

    const activeBottomTab = this.getActiveBottomTab();

    if (activeBottomTab === "Account") this.navigate("AuthenticatedAccountChallengeDetail", {challenge}, `AuthenticatedAccountChallengeDetail-${challenge.id}`);
    else this.navigate("AuthenticatedHomeChallengeDetail", {challenge}, `AuthenticatedHomeChallengeDetail-${challenge.id}`);
  };

  public navigateToIdeasPager = ({challenge, idea}: NavigateToIdeasPagerOptions) => {
    const {authToken} = this.appStore.dataStore.userState;

    let routeName: string;
    if (_.isNil(authToken)) {
      routeName = "UnauthenticatedIdeasPager";
      this.navigate(routeName, {challenge, idea}, uuidV4());
      return;
    }

    const activeBottomTab = this.getActiveBottomTab();
    routeName = `Authenticated${activeBottomTab}IdeasPager`;

    this.navigate(routeName, {challenge, idea}, uuidV4());
  };

  public navigateToNewChallenge = (challenge: Models.Challenge) => {
    const routeName = "AuthenticatedAccountNewChallenge";

    this.navigate(routeName, {challenge}, uuidV4());
  };

  public navigateToForgotPassword = () => {
    this.navigate("ForgotPassword");
  };

  public navigateToPendingAccount = (email: string) => {
    this.navigate("PendingAccount", {email});
  };

  public navigateToImageViewer = (images: IImageInfo[]) => {
    this.navigate("ImageViewer", {images});
  };

  public navigateToAbout = () => {
    const {authToken} = this.appStore.dataStore.userState;

    if (authToken !== undefined) this.navigate("AuthenticatedAccountAbout");
    else this.navigate("UnauthenticatedAbout");
  };
}
