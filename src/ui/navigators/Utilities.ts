import {createStackNavigator} from "react-navigation";
import * as Screens from "../screens";
import {Variables} from "../style";

export const Utilities = createStackNavigator(
  {
    ImageViewer: Screens.ImageViewer,
  },
  {
    navigationOptions: {
      headerTintColor: Variables.whiteColor,
      headerTransparent: true,
      headerBackTitle: null,
    },
    defaultNavigationOptions: {
      headerBackTitle: null,
    },
  }
);
