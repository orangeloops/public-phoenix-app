import {createBottomTabNavigator} from "react-navigation";
import {Home} from "./Home";
import {Account} from "./Account";
import {NewChallenge} from "./NewChallenge";
import {Variables} from "../style";

export const Authenticated = createBottomTabNavigator(
  {
    Home,
    NewChallenge,
    Account,
  },
  {
    tabBarOptions: {
      activeTintColor: Variables.primaryColor,
      inactiveTintColor: Variables.blackColor,
    },
  }
);
