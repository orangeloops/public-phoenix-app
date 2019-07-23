import * as React from "react";
import Icon from "react-native-vector-icons/Feather";
import {createStackNavigator} from "react-navigation";
import * as Screens from "../screens";

export const NewChallenge = createStackNavigator(
  {
    NewChallenge: Screens.NewChallenge,
  },
  {
    headerLayoutPreset: "center",
  }
);

NewChallenge.navigationOptions = {
  tabBarIcon: (props: {tintColor: string}) => <Icon name="codepen" size={23} color={props.tintColor} />,
  tabBarLabel: "New Challenge",
};
