import {StyleSheet} from "react-native";
import {Variables} from "../../style";

export const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Variables.whiteColor,
  },
  popoverButtonContainer: {
    height: "100%",
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  popoverButton: {},
  popoverItemDelete: {
    padding: 5,
    minWidth: 70,
  },
  noIdeasContainer: {
    alignItems: "center",
    padding: 22,
  },
  noIdeasText: {},
});
