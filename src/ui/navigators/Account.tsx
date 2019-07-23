import * as React from "react";
import Icon from "react-native-vector-icons/Feather";
import {createStackNavigator, TabBarIconProps} from "react-navigation";
import * as Screens from "../screens";

export const Account = createStackNavigator(
  {
    Account: Screens.Account,
    AuthenticatedAccountNewIdea: Screens.NewIdea,
    AuthenticatedAccountChallengeDetail: Screens.ChallengeDetail,
    AuthenticatedAccountIdeasPager: Screens.IdeasPager,
    AuthenticatedAccountAccount: Screens.Account,
    AuthenticatedAccountNewChallenge: Screens.NewChallenge,
    AuthenticatedAccountAbout: Screens.About,
  },
  {
    defaultNavigationOptions: {headerBackTitle: null},
    navigationOptions: {
      tabBarIcon: (props: TabBarIconProps) => <Icon name="user" size={23} color={props.tintColor || undefined} />,
    },
    headerLayoutPreset: "center",
  }
);
