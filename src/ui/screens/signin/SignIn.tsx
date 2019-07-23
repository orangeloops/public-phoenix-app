import {observer} from "mobx-react";
import * as React from "react";
import {ActivityIndicator, SafeAreaView, ScrollView, StatusBar, TextInput, TouchableOpacity, View} from "react-native";
import {HeaderView} from "../../components";
import {SignInBase} from "./SignInBase";
import {style} from "./SignInStyles";
import {AppText} from "../../components";
import {Variables} from "../../style";

const headerImage = require("../../assets/login_header_image.png");

@observer
export class SignIn extends SignInBase {
  render() {
    const {email, password} = this.state;
    const {signInStatus} = this.dataStore.userState;
    const {navigationState} = this.appStore;

    return (
      <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: Variables.primaryColor}} />
        <StatusBar barStyle="light-content" translucent={false} backgroundColor={Variables.primaryColor} />

        <SafeAreaView style={style.container}>
          <ScrollView contentContainerStyle={style.scrollViewContentContainer}>
            <HeaderView imagePath={headerImage}>
              <View style={style.bottomContainer}>
                {/*<View style={style.logInWithContainer}>*/}
                {/*<TouchableOpacity style={style.logInFacebookContainer}>*/}
                {/*<View style={style.logInFacebookImage} />*/}

                {/*<AppText style={style.logInFacebookText}>Facebook</AppText>*/}
                {/*</TouchableOpacity>*/}

                {/*<TouchableOpacity style={style.logInGoogleContainer}> TODO-SG: implement*/}
                {/*<View style={style.logInGoogleImage} />*/}

                {/*<AppText style={style.logInGoogleText}>Google</AppText>*/}
                {/*</TouchableOpacity>*/}
                {/*</View>*/}

                {/*<View style={style.dividerContent}>*/}
                {/*<View style={style.dividerLine} />*/}

                {/*<AppText style={style.dividerText}>or</AppText>*/}

                {/*<View style={style.dividerLine} />*/}
                {/*</View>*/}

                <TextInput placeholder="Email" value={email} onChangeText={this.handleEmailChange} underlineColorAndroid="transparent" style={style.emailInput} />

                <TextInput placeholder="Password" value={password} onChangeText={this.handlePasswordChange} secureTextEntry={true} underlineColorAndroid="transparent" style={style.passwordInput} />

                <TouchableOpacity style={style.logInButtonContainer} onPress={this.handleSignIn}>
                  <AppText style={style.logInButtonText}>LOG IN</AppText>
                </TouchableOpacity>

                <AppText style={[style.forgotPasswordContainer, style.forgotPasswordLink]} onPress={navigationState.navigateToForgotPassword}>
                  FORGOT PASSWORD?
                </AppText>

                <AppText style={style.createAccountContainer}>
                  DON'T HAVE AN ACCOUNT?
                  <AppText style={style.createAccountLink} onPress={navigationState.navigateToSignUp}>
                    {" "}
                    SIGN UP!
                  </AppText>
                </AppText>
              </View>
            </HeaderView>

            {signInStatus.isLoading && <ActivityIndicator size="large" style={style.isLoadingIndicator} />}
          </ScrollView>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
