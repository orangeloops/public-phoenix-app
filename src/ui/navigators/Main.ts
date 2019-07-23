import {createSwitchNavigator} from "react-navigation";
import * as Screens from "../screens";
import {Authenticated} from "./Authenticated";
import {Unauthenticated} from "./Unauthenticated";

export const Main = createSwitchNavigator({
  AuthCheck: Screens.AuthCheck,
  Authenticated,
  Unauthenticated,
});

Main.navigationOptions = {
  header: null,
  headerBackTitle: null,
};
