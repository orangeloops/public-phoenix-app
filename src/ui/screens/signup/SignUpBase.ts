import * as _ from "lodash";
import {BaseScreen, BaseScreenProps, BaseScreenState} from "../BaseScreen";
import {Alert} from "react-native";
import {Variables} from "../../style";
import {Helper} from "../../../core";

export interface SignUpProps extends BaseScreenProps {}

export interface SignUpState extends BaseScreenState {
  userName: string | undefined;
  email: string | undefined;
  password: string | undefined;
  confirmedPassword: string | undefined;
  shouldShowLoading: boolean;
}

export abstract class SignUpBase extends BaseScreen<SignUpProps, SignUpState> {
  public static navigationOptions = {
    headerTransparent: true,
    headerTintColor: Variables.whiteColor,
  };

  constructor(props: SignUpProps) {
    super(props);
    this.state.shouldShowLoading = false;
  }

  protected handleUserNameChange = (userName: string) => this.setState({userName});

  protected handleEmailChange = (email: string) => this.setState({email});

  protected handlePasswordChange = (password: string) => this.setState({password});

  protected handleConfirmedPasswordChange = (confirmedPassword: string) => this.setState({confirmedPassword});

  protected checkEmailExistence = async () => {
    const {userState} = this.dataStore;
    const checkEmailResponse = await userState.checkEmail({email: this.state.email!});

    this.state.shouldShowLoading = checkEmailResponse.isLoading;
    if (!checkEmailResponse.success || !checkEmailResponse.isAvailable || checkEmailResponse.isBlacklisted) {
      setTimeout(() => Alert.alert("Error", "This email is already registered."), 600);
      return;
    }
  };

  protected handleSignUp = async () => {
    const {userName, email, password} = this.state;
    const {userState} = this.dataStore;
    const {navigationState} = this.appStore;
    const {checkEmailStatus, signUpStatus} = userState;

    if (checkEmailStatus.isLoading || signUpStatus.isLoading || !this.validateFields()) return;

    const signUpResponse = await userState.signUp({name: userName!, email: email!, password: password!});

    if (signUpResponse.success) navigationState.navigateToValidate(email!);
    else setTimeout(() => Alert.alert("Error", Helper.isArray(signUpResponse.errors) ? signUpResponse.errors[0].message : signUpResponse.errors!.message), 600);
  };

  protected handleSignIn = () => {
    const {navigationState} = this.appStore;

    navigationState.navigateToSignIn();
  };

  private validateFields(): boolean {
    const {userName, email, password, confirmedPassword} = this.state;
    const emailRegex = /^\w+([.+_\-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (_.isNil(userName) || _.isNil(email) || _.isNil(password) || _.isNil(confirmedPassword)) {
      Alert.alert("Error", "All fields must be completed");
      return false;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Invalid email format");
      return false;
    }
    if (password !== confirmedPassword) {
      Alert.alert("Error", "Passwords do not match");
      return false;
    }
    return true;
  }
}
