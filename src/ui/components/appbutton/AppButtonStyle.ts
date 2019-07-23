import {StyleProp, StyleSheet, ViewStyle} from "react-native";
import {Variables} from "../../style";

const buttonContainer: StyleProp<ViewStyle> = {
  paddingVertical: 10,
  paddingHorizontal: 20,
  width: 130,
  flexDirection: "row",
  alignItems: "center",
  height: 50,
};

export const style = StyleSheet.create({
  primaryContainer: {
    ...buttonContainer,
    backgroundColor: Variables.primaryColor,
  },
  containerWithoutIcon: {
    justifyContent: "center",
  },
  containerWithIcon: {},
  primaryText: {
    color: Variables.whiteColor,
    flexShrink: 1,
  },
  secondaryContainer: {
    ...buttonContainer,
    borderWidth: 1,
    borderColor: Variables.primaryColor,
  },
  secondaryText: {
    color: Variables.primaryColor,
  },
  icon: {
    marginRight: 15,
  },
});
