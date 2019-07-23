import {StyleSheet} from "react-native";
import {Variables} from "../../style";

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
  topContainer: {
    flex: 1,
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Variables.primaryColor,
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
  userNameInput: {
    ...inputStyle,
  },
  emailInput: {
    ...inputStyle,
  },
  passwordInput: {
    ...inputStyle,
  },
  confirmPasswordInput: {
    ...inputStyle,
    marginBottom: 40,
  },
  signUpButtonContainer: {
    marginBottom: 30,
    backgroundColor: Variables.primaryColor,
  },
  signUpButtonText: {
    paddingVertical: 15,
    color: Variables.whiteColor,
    textAlign: "center",
    fontWeight: "bold",
  },
  logInContainer: {
    marginBottom: 30,
    textAlign: "center",
    letterSpacing: 2,
  },
  logInLink: {
    fontWeight: "bold",
  },
  modalFullScreen: {
    flexGrow: 1,
    backgroundColor: Variables.blackColor,
    opacity: 0.5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
