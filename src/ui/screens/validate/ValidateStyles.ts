import {StyleSheet} from "react-native";
import {Variables} from "../../style";

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Variables.whiteColor,
  },
  scrollViewContentContainer: {
    flexGrow: 1,
  },
  bottomContainer: {
    flexGrow: 1,
    flexShrink: 0,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: Variables.whiteColor,
  },
  validateTitle: {
    color: Variables.primaryColor,
    fontWeight: "bold",
    marginBottom: 45,
    fontSize: 20,
    textAlign: "center",
  },
  validateContentText: {
    color: Variables.blackColor,
    fontSize: 16,
    textAlign: "center",
  },
  validateEmail: {
    color: Variables.blackColor,
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  goHomeButton: {
    marginTop: 50,
    width: "auto",
  },
  goHomeButtonText: {
    fontWeight: "bold",
    paddingVertical: 5,
  },
  resendEmailButton: {
    marginVertical: 30,
    width: "auto",
  },
  resendEmailButtonText: {
    fontWeight: "bold",
    paddingVertical: 5,
  },
});
