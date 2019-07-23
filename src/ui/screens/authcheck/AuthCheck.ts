import SplashScreen from "react-native-splash-screen";
import {BaseScreen} from "../BaseScreen";
import * as _ from "lodash";

export class AuthCheck extends BaseScreen {
  public static navigationOptions = {
    header: () => null,
  };

  public async componentDidMount() {
    const {dataStore, appStore} = this;
    const {navigationState, storageState} = appStore;
    const {userState} = dataStore;

    const authToken = await storageState.getAuthToken();
    const refreshToken = await storageState.getRefreshToken();

    if (!_.isNil(authToken)) await userState.testToken({token: authToken, refreshToken});

    appStore.listenTokensChange();

    navigationState.navigateToHome();
    SplashScreen.hide();
  }

  render() {
    return null;
  }
}
