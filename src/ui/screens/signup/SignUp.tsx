import * as React from "react";
import {ActivityIndicator, Modal, SafeAreaView, ScrollView, StatusBar, TextInput, TouchableOpacity, View} from "react-native";
import {HeaderView} from "../../components";
import {SignUpBase} from "./SignUpBase";
import {style} from "./SignUpStyles";
import {AppText} from "../../components";
import {observer} from "mobx-react";
import {Variables} from "../../style";

const headerImage = require("../../assets/signIn_header_image.png");

@observer
export class SignUp extends SignUpBase {
  render() {
    const {signUpStatus, checkEmailStatus} = this.dataStore.userState;
    const {userName, email, password, confirmedPassword} = this.state;
    console.log(checkEmailStatus.isLoading);
    return (
      <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: Variables.primaryColor}} />

        <SafeAreaView style={style.container}>
          <StatusBar barStyle="light-content" />
          <ScrollView contentContainerStyle={style.scrollViewContentContainer}>
            <HeaderView imagePath={headerImage}>
              <View style={style.bottomContainer}>
                <TextInput placeholder="Name" value={userName} onChangeText={this.handleUserNameChange} underlineColorAndroid="transparent" style={style.userNameInput} />

                <View style={{justifyContent: "center"}}>
                  <TextInput onBlur={this.checkEmailExistence} placeholder="Email" value={email} onChangeText={this.handleEmailChange} underlineColorAndroid="transparent" style={style.emailInput} />

                  {checkEmailStatus.isLoading && <ActivityIndicator color={Variables.blackColor} size={"small"} style={{alignSelf: "flex-end", position: "absolute"}} />}
                </View>

                <TextInput placeholder="Password" secureTextEntry={true} value={password} onChangeText={this.handlePasswordChange} underlineColorAndroid="transparent" style={style.passwordInput} />

                <TextInput placeholder="Confirm Password" secureTextEntry={true} value={confirmedPassword} onChangeText={this.handleConfirmedPasswordChange} underlineColorAndroid="transparent" style={style.confirmPasswordInput} />

                <TouchableOpacity onPress={this.handleSignUp} style={style.signUpButtonContainer}>
                  <AppText style={style.signUpButtonText}>SIGN UP</AppText>
                </TouchableOpacity>

                <AppText style={style.logInContainer}>
                  DO HAVE AN ACCOUNT?
                  <AppText style={style.logInLink} onPress={this.handleSignIn}>
                    {" "}
                    LOG IN!
                  </AppText>
                </AppText>
              </View>
            </HeaderView>

            {signUpStatus.isLoading && (
              <Modal presentationStyle="overFullScreen" transparent={true} animationType="slide" onRequestClose={() => {}}>
                <View style={style.modalFullScreen}>
                  <AppText style={{color: Variables.whiteColor, marginBottom: 20}}>Creating your user!</AppText>
                  <ActivityIndicator size="large" color={Variables.whiteColor} />
                </View>
              </Modal>
            )}
          </ScrollView>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
