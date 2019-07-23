import {createStackNavigator} from "react-navigation";
import * as Screens from "../screens";

export const Unauthenticated = createStackNavigator(
  {
    UnauthenticatedHome: Screens.Home,
    UnauthenticatedNewIdea: Screens.NewIdea,
    UnauthenticatedChallengeDetail: Screens.ChallengeDetail,
    UnauthenticatedIdeasPager: Screens.IdeasPager,
    UnauthenticatedAccount: Screens.Account,
    UnauthenticatedAbout: Screens.About,
    SignIn: Screens.SignIn,
    SignUp: Screens.SignUp,
    Validate: Screens.Validate,
    ForgotPassword: Screens.ForgotPassword,
    PendingAccount: Screens.PendingAccount,
  },
  {
    defaultNavigationOptions: {
      headerBackTitle: null,
    },
    headerMode: "screen",
    headerLayoutPreset: "center",
  }
);
