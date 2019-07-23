import {StyleSheet} from "react-native";
import {Variables} from "../../style";

export const style = StyleSheet.create({
  container: {
    backgroundColor: Variables.whiteColor,
    flex: 1,
  },
  popoverButton: {},
  separator: {
    marginVertical: 10,
    height: 1,
    backgroundColor: Variables.blackColor,
  },
  challengeList: {
    backgroundColor: Variables.whiteColor,
  },
  emptyListMessage: {
    textAlign: "center",
    padding: 10,
  },
  errorContent: {
    alignItems: "center",
    padding: 20,
  },
  errorMessage: {
    textAlign: "center",
  },
  tryAgainButton: {
    marginTop: 20,
    width: "auto",
  },
});
