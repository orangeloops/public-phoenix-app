import {observer} from "mobx-react";
import * as React from "react";
import {Alert, SafeAreaView, ScrollView, StatusBar, View} from "react-native";
import {AppButton, HeaderView} from "../../components";
import {style} from "./ValidateStyles";
import {AppText} from "../../components";
import {BaseScreen, BaseScreenProps} from "../../screens/BaseScreen";
import {Variables} from "../../style";
import {runInAction} from "mobx";

const headerImage = require("../../assets/validate_header_image.png");

@observer
export class Validate extends BaseScreen {
  public static navigationOptions = {
    headerTransparent: true,
    headerTintColor: Variables.whiteColor,
  };

  protected email: string;

  constructor(props: BaseScreenProps) {
    super(props);

    const {navigation} = this.props;
    this.email = navigation.getParam("email");
  }

  protected handleGotoHome = () => {
    const {navigationState} = this.appStore;

    navigationState.navigateToHome();
  };

  protected handleResendEmail = async () => {
    const {email} = this;
    const {userState} = this.dataStore;
    const {resendEmailConfirmationStatus} = userState;

    if (resendEmailConfirmationStatus.isLoading || email === undefined) return;

    const response = await userState.resendEmailConfirmation({email});

    if (response.success) Alert.alert("Great", "The email was just resent.");
    else Alert.alert("Oops...", response.error!.message);
  };

  componentWillUnmount(): void {
    const {userState} = this.dataStore;

    runInAction(() => (userState.resendEmailConfirmationStatus = userState.initialResendEmailConfirmationStatus));
  }

  render() {
    const {email} = this;
    const {resendEmailConfirmationStatus} = this.dataStore.userState;

    return (
      <React.Fragment>
        <SafeAreaView style={{flex: 0, backgroundColor: Variables.primaryColor}} />

        <SafeAreaView style={style.container}>
          <StatusBar barStyle="light-content" />
          <ScrollView contentContainerStyle={style.scrollViewContentContainer}>
            <HeaderView imagePath={headerImage}>
              <View style={style.bottomContainer}>
                <AppText style={style.validateTitle}>Confirm your email address</AppText>

                <AppText style={style.validateContentText}>
                  We sent a confirmation email to:
                  {"\n\n"}
                  <AppText style={style.validateEmail}>{email ? email : "Unknown"}</AppText>
                  {"\n\n"}
                  Check your email and click on the confirmation link to continue.
                </AppText>

                <AppButton onPress={this.handleGotoHome} style={style.goHomeButton} textStyle={style.goHomeButtonText}>
                  GO TO HOME
                </AppButton>

                {!resendEmailConfirmationStatus.success && (
                  <AppButton onPress={this.handleResendEmail} isPrimary={false} style={style.resendEmailButton} textStyle={style.resendEmailButtonText}>
                    {!resendEmailConfirmationStatus.isLoading ? "RESEND EMAIL" : "RESENDING EMAIL..."}
                  </AppButton>
                )}
              </View>
            </HeaderView>
          </ScrollView>
        </SafeAreaView>
      </React.Fragment>
    );
  }
}
