import {createAppContainer, createStackNavigator} from "react-navigation";
import {Utilities} from "./Utilities";
import {Main} from "./Main";
import {Variables} from "../style";

export const Root = createAppContainer(
  createStackNavigator(
    {Main, Utilities},
    {
      navigationOptions: {
        headerTintColor: Variables.whiteColor,
        headerTransparent: true,
      },
    }
  )
);
