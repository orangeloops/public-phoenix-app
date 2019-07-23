import {BaseScreen} from "../BaseScreen";
import * as React from "react";
import {Image, ImageStyle, Linking, Platform, ScrollView, StyleProp, TouchableWithoutFeedback, View} from "react-native";
import {aboutStyle} from "./AboutStyle";
import {Variables} from "../../style";
import {AppText} from "../../components";
import DeviceInfo from "react-native-device-info";
import twitter from "../../assets/twitter.png";
import facebook from "../../assets/facebook.png";

const orangeloopsLogo = require("../../assets/orangeloops_logo.png");

const review = Platform.select({
  ios: {
    message: "REVIEW ON APPSTORE",
    url: "itms://itunes.apple.com/us/app/apple-store/com.orangeloops.ideasource?mt=8",
  },
  android: {
    message: "REVIEW ON PLAY STORE",
    url: "market://details?id=com.orangeloops.ideasource",
  },
});

export class About extends BaseScreen {
  public static navigationOptions = {
    headerTitle: "ABOUT",
    headerTitleStyle: {
      color: Variables.whiteColor,
      fontSize: 20,
      borderBottomWidth: 0,
      elevation: 0,
    },
    headerTintColor: Variables.whiteColor,
    headerStyle: {
      backgroundColor: Variables.primaryColor,
    },
  };

  handleOrangeloopsLogoPress = () => {
    Linking.openURL("http://www.orangeloops.com");
  };

  handleTermsOfUsePress = () => {
    Linking.openURL("https://ideasource.io/terms-of-use.html");
  };

  handlePrivacyPolicyPress = () => {
    Linking.openURL("https://ideasource.io/privacy-policy.html");
  };

  handleReviewPress = () => {
    Linking.openURL(review.url);
  };

  handleFacebookPress = () => {
    Linking.openURL("https://www.facebook.com/orangeloops");
  };

  handleTwitterPress = () => {
    Linking.openURL("https://twitter.com/orangeloopsinc");
  };

  render() {
    return (
      <ScrollView style={aboutStyle.container} contentContainerStyle={aboutStyle.scrollViewContentContainer}>
        <AppText style={aboutStyle.developedBy}>IdeaSource</AppText>
        <AppText style={aboutStyle.developedBy}>is developed by</AppText>

        <TouchableWithoutFeedback onPress={this.handleOrangeloopsLogoPress}>
          <Image source={orangeloopsLogo} resizeMode="contain" style={aboutStyle.orangeloopsLogo as StyleProp<ImageStyle>} />
        </TouchableWithoutFeedback>

        <AppText style={aboutStyle.followUs}>Follow us</AppText>

        <View style={aboutStyle.socialMediaContainer}>
          <TouchableWithoutFeedback onPress={this.handleTwitterPress}>
            <View style={aboutStyle.twitterContainer}>
              <Image source={twitter} style={aboutStyle.twitterImage as StyleProp<ImageStyle>} />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.handleFacebookPress}>
            <View style={aboutStyle.facebookContainer}>
              <Image source={facebook} style={aboutStyle.facebookImage as StyleProp<ImageStyle>} />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <AppText style={aboutStyle.version}>Version {DeviceInfo.getReadableVersion()}</AppText>

        <AppText style={aboutStyle.termsOfUseText} onPress={this.handleTermsOfUsePress}>
          Terms of Use
        </AppText>

        <AppText style={aboutStyle.termsOfUseText} onPress={this.handlePrivacyPolicyPress}>
          Privacy Policy
        </AppText>

        <AppText style={aboutStyle.reviewText} onPress={this.handleReviewPress}>
          {review.message}
        </AppText>
        <View />
      </ScrollView>
    );
  }
}
