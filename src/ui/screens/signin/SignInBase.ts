import * as _ from "lodash";
import {BaseScreen, BaseScreenProps, BaseScreenState} from "../BaseScreen";
import {Alert} from "react-native";
import {Helper} from "../../../core";
import {Variables} from "../../style";

export interface SignInProps extends BaseScreenProps {}

export interface SignInState extends BaseScreenState {
  email: string;
  password: string;
}

export abstract class SignInBase extends BaseScreen<SignInProps, SignInState> {
  public static navigationOptions = {
    headerTintColor: Variables.whiteColor,
    headerTransparent: true,
  };

  public state = {
    email: "",
    password: "",
  };

  protected handleEmailChange = (email: string) => this.setState({email});

  protected handlePasswordChange = (password: string) => this.setState({password});

  protected handleSignIn = () => {
    const {appStore} = this;
    const {email, password} = this.state;
    const {signInStatus} = this.dataStore.userState;

    if (signInStatus.isLoading) return;

    appStore.signIn({email, password}).then(response => {
      const {navigation} = this.props;
      const {navigationState} = this.appStore;

      if (!response.success) {
        const error = !_.isNil(response.errors) ? (Helper.isArray(response.errors) ? response.errors[0] : response.errors) : undefined;

        if (_.isNil(error) || error.code !== "PENDING_ACCOUNT_ERROR") Alert.alert("Error", !_.isNil(error) ? error.message : "There was an unexpected error.");
        else if (!_.isNil(error) && error.code === "PENDING_ACCOUNT_ERROR") navigationState.navigateToPendingAccount(email);
      } else {
        const onSuccess = navigation.getParam("onSuccess");

        if (!_.isNil(onSuccess)) onSuccess();
        else navigationState.navigateToHome();
      }
    });
  };
}
