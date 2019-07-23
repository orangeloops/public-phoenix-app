import {StyleSheet, TextStyle} from "react-native";
import {Variables} from "../../style";

export const style = StyleSheet.create({
  wrapper: {
    marginLeft: 0,
  },
  text: {
    color: Variables.blackColor,
    fontWeight: "normal",
    flexShrink: 1,
  } as TextStyle,
});
