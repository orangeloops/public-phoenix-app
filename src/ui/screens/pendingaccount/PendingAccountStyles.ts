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
  navigateToHomeButton: {
    marginTop: 40,
    width: "auto",
  },
  resendEmailButton: {
    marginTop: 20,
    width: "auto",
  },
});
