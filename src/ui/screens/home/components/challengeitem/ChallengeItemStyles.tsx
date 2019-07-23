import {StyleSheet} from "react-native";
import {Variables} from "../../../../style";

export const style = StyleSheet.create({
  container: {},
  challengeInfoContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-start",
    position: "relative",
    height: 250,
    padding: 20,
  },
  challengeImage: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    marginVertical: 11,
    backgroundColor: Variables.auxiliaryColor,
  },
  challengeTitle: {
    backgroundColor: Variables.whiteColor,
    fontSize: 24,
    paddingHorizontal: 5,
    fontWeight: "bold",
  },
  challengeDescription: {
    backgroundColor: Variables.whiteColor,
    paddingHorizontal: 5,
  },
  ideaListSeparator: {
    width: 10,
  },
  ideaList: {
    marginBottom: 11,
  },
  ideaListContentContainer: {
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 11,
  },
});
