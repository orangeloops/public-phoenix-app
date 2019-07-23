import {StyleSheet} from "react-native";
import {Variables} from "../../style";
import {transparentize} from "polished";

export const style = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: 200,
    backgroundColor: transparentize(0.5, Variables.primaryColor),
  },
  image: {
    width: "100%",
    height: "100%",
  },
  pictureIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  activityIndicator: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    height: 70,
    width: "100%",
  },
});
