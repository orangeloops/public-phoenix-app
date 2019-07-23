import {BaseScreen, BaseScreenProps} from "../BaseScreen";
import * as React from "react";
import {Alert, SafeAreaView, ScrollView, StatusBar, View} from "react-native";
import {style} from "./PendingAccountStyles";
import {HeaderView} from "../../components";
import {observer} from "mobx-react";
import {AppText} from "../../components";
import {AppButton} from "../../components/appbutton";
import {Variables} from "../../style";

const headerImage = require("../../assets/pending_account_header_image.png");

@observer
export class PendingAccount extends BaseScreen {
  public static navigationOptions = {
    headerTintColor: Variables.whiteColor,
    headerTransparent: true,
  };

  protected email: string | undefined;

  constructor(props: BaseScreenProps) {
    super(props);

    const {navigation} = props;
    this.email = navigation.getParam("email");
  }

  protected handleNavigateToHome = () => {
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

  public render() {
    const {resendEmailConfirmationStatus} = this.dataStore.userState;

    return (
      <>
        <SafeAreaView style={{flex: 0, backgroundColor: Variables.primaryColor}} />
        <StatusBar barStyle="light-content" translucent={false} backgroundColor={Variables.primaryColor} />

        <SafeAreaView style={style.container}>
          <ScrollView contentContainerStyle={style.scrollViewContentContainer}>
            <HeaderView imagePath={headerImage}>
              <View style={style.bottomContainer}>
                <AppText>You have not activated your account yet. To do so, please find the email we sent to your email account and follow the steps.</AppText>

                <AppButton onPress={this.handleNavigateToHome} style={style.navigateToHomeButton}>
                  GO TO HOME
                </AppButton>

                {!resendEmailConfirmationStatus.success && (
                  <AppButton onPress={this.handleResendEmail} isPrimary={false} style={style.resendEmailButton}>
                    {!resendEmailConfirmationStatus.isLoading ? "RESEND EMAIL" : "RESENDING EMAIL..."}
                  </AppButton>
                )}
              </View>
            </HeaderView>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}
