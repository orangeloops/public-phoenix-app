import * as React from "react";
import Icon from "react-native-vector-icons/Feather";
import {createStackNavigator, TabBarIconProps} from "react-navigation";
import * as Screens from "../screens";

export const Home = createStackNavigator(
  {
    Home: Screens.Home,
    AuthenticatedHomeNewIdea: Screens.NewIdea,
    AuthenticatedHomeChallengeDetail: Screens.ChallengeDetail,
    AuthenticatedHomeIdeasPager: Screens.IdeasPager,
    AuthenticatedHomeAccount: Screens.Account,
  },
  {
    defaultNavigationOptions: {headerBackTitle: null},
    navigationOptions: {tabBarIcon: (props: TabBarIconProps) => <Icon name="home" size={23} color={props.tintColor || undefined} />},
    headerLayoutPreset: "center",
  }
);
