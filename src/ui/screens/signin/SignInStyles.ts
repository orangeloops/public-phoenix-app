import {StyleSheet} from "react-native";
import {Variables} from "../../style";

const loginWithContentStyle: StyleSheet.NamedStyles<{}> = {
  alignItems: "center",
  flexDirection: "row",
  flexGrow: 1,
  marginBottom: 15,
  borderRadius: 50,
  paddingHorizontal: 15,
  paddingVertical: 10,
  backgroundColor: Variables.auxiliaryColor,
  justifyContent: "center",
};

const loginWithImageStyle: StyleSheet.NamedStyles<{}> = {
  marginRight: 10,
  borderRadius: 50,
  height: 30,
  width: 30,
};

const loginWithTextStyle: StyleSheet.NamedStyles<{}> = {
  color: Variables.primaryColor,
  flexWrap: "wrap",
};

const inputStyle = {
  borderBottomWidth: 1,
  borderBottomColor: Variables.primaryColor,
  paddingHorizontal: 15,
  paddingVertical: 10,
  marginBottom: 20,
  fontFamily: "Montserrat-Regular",
};

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Variables.whiteColor,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  logo: {
    marginTop: 15,
    marginBottom: 30,
    height: 100,
    width: 100,
    backgroundColor: Variables.auxiliaryColor,
  },
  bottomContainer: {
    flexGrow: 1,
    flexShrink: 0,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: Variables.whiteColor,
  },
  logInWithContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  logInFacebookContainer: {
    ...loginWithContentStyle,
    marginRight: "5%",
  },
  logInFacebookImage: {
    ...loginWithImageStyle,
    backgroundColor: "#446AB1",
  },
  logInFacebookText: {
    ...loginWithTextStyle,
  },
  logInGoogleContainer: {
    ...loginWithContentStyle,
  },
  logInGoogleImage: {
    ...loginWithImageStyle,
    backgroundColor: "#DD4B39",
  },
  logInGoogleText: {
    ...loginWithTextStyle,
  },
  dividerContent: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  dividerLine: {
    backgroundColor: "#F0EAE2",
    height: 1,
    flex: 1,
  },
  dividerText: {
    marginHorizontal: 20,
    color: Variables.cloudyGrayColor,
  },
  emailInput: {
    ...inputStyle,
  },
  passwordInput: {
    ...inputStyle,
    marginBottom: 40,
  },
  logInButtonContainer: {
    marginBottom: 30,
    backgroundColor: Variables.primaryColor,
  },
  logInButtonText: {
    paddingVertical: 15,
    color: Variables.whiteColor,
    textAlign: "center",
    fontWeight: "bold",
  },
  forgotPasswordContainer: {
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 2,
  },
  forgotPasswordLink: {
    fontWeight: "bold",
  },
  createAccountContainer: {
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 2,
  },
  createAccountLink: {
    fontWeight: "bold",
  },
  isLoadingIndicator: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});
