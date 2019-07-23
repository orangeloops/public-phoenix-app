import * as _ from "lodash";
import {BaseScreen, BaseScreenProps, BaseScreenState} from "../BaseScreen";
import {ActivityIndicator, Alert, SafeAreaView, ScrollView, StatusBar, TextInput, TouchableOpacity, View} from "react-native";
import * as React from "react";
import {HeaderView} from "../../components";
import {AppText} from "../../components";
import {observer} from "mobx-react";
import {style} from "./ForgotPasswordStyles";
import {Helper} from "../../../core";
import {Variables} from "../../style";

export interface ForgotPasswordProps extends BaseScreenProps {}

export interface ForgotPasswordState extends BaseScreenState {
  submitting: boolean;
  success?: boolean;
  email: string;
}

const headerImage = require("../../assets/login_header_image.png");

@observer
export class ForgotPassword extends BaseScreen<ForgotPasswordProps, ForgotPasswordState> {
  public static navigationOptions = {
    headerTintColor: Variables.whiteColor,
    headerTransparent: true,
  };

  public state: ForgotPasswordState = {
    submitting: false,
    email: "",
  };

  protected handleEmailChange = (email: string) => this.setState({email});

  protected handleSubmit = async () => {
    const {userState} = this.dataStore;
    const {submitting, email} = this.state;

    if (submitting) return;

    this.setState({submitting: true});
    const {success, errors} = await userState.requestResetPassword({email});

    this.setState({
      submitting: false,
      success,
    });

    if (!success) Alert.alert("Error", !_.isNil(errors) ? (!Helper.isArray(errors) ? errors.message : errors[0].message) : "There was an unexpected error.");
  };

  render() {
    const {submitting, success, email} = this.state;

    let content;

    if ((_.isNil(success) || !success) && !submitting) {
      content = (
        <>
          <AppText style={style.createAccountContainer}>Write your email and we'll send the instructions to reset your password.</AppText>

          <TextInput placeholder="Email" value={email} onChangeText={this.handleEmailChange} underlineColorAndroid="transparent" style={style.emailInput} />

          <TouchableOpacity style={style.logInButtonContainer} onPress={this.handleSubmit}>
            <AppText style={style.logInButtonText}>RESET PASSWORD</AppText>
          </TouchableOpacity>
        </>
      );
    } else if (submitting) content = <ActivityIndicator size="large" style={style.isLoadingIndicator} />;
    else content = <AppText>Please check your email. If the address you sent is correct you'll be receiving an email with instructions to follow.</AppText>;

    return (
      <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: Variables.primaryColor}} />
        <StatusBar barStyle="light-content" translucent={false} backgroundColor={Variables.primaryColor} />

        <SafeAreaView style={style.container}>
          <ScrollView contentContainerStyle={style.scrollViewContentContainer}>
            <HeaderView imagePath={headerImage}>
              <View style={style.bottomContainer}>{content}</View>
            </HeaderView>
          </ScrollView>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
