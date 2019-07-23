import {StyleSheet} from "react-native";
import {Variables} from "../../style";

export const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    position: "relative",
    justifyContent: "center",
    height: 250,
  },
  headerImage: {
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    position: "absolute",
  },
  title: {
    alignSelf: "flex-end",
    padding: 10,
    color: Variables.whiteColor,
    fontSize: 40,
  },
});
