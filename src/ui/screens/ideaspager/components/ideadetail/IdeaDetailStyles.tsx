import {StyleSheet} from "react-native";
import {Variables} from "../../../../style";

export const style = StyleSheet.create({
  container: {
    backgroundColor: Variables.whiteColor,
    position: "relative",
  },
  mainImageContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "100%",
  },
  mainImage: {
    backgroundColor: Variables.auxiliaryColor,
    height: 250,
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  scrollContainer: {},
  scrollContentContainer: {
    flexGrow: 1,
  },
  createdDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    paddingHorizontal: 10,
    height: 70,
  },
  createdDataGradient: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: "100%",
  },
  createdByImageContainer: {
    height: 50,
    width: 50,
    position: "relative",
  },
  createdByImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Variables.primaryColor,
  },
  createdByImageBorder: {
    position: "absolute",
    height: 50,
    width: 50,
    borderRadius: 25,
    borderColor: Variables.primaryColor,
    borderWidth: 3,
  },
  createdByName: {
    flexGrow: 1,
    flexShrink: 1,
    paddingHorizontal: 10,
    color: Variables.whiteColor,
    fontSize: 24,
    fontWeight: "bold",
  },
  createdAt: {
    color: Variables.whiteColor,
    fontSize: 24,
    fontWeight: "bold",
  },
  reactionsBanner: {
    flexDirection: "row",
    paddingHorizontal: 10,
    height: 50,
    alignItems: "center",
  },
  reactionsText: {
    marginLeft: 10,
    flexGrow: 1,
    flexShrink: 1,
    color: Variables.primaryColor,
  },
  likesDeadline: {
    textAlign: "right",
  },
  likesDeadlineTitle: {},
  likesDeadlineDate: {
    fontWeight: "bold",
    color: Variables.secondaryColor,
  },
  ideaInfoContainer: {
    backgroundColor: Variables.whiteColor,
    flex: 1,
  },
  ideaTitle: {
    fontWeight: "bold",
    fontSize: 18,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  ideaDescription: {
    paddingHorizontal: 10,
    marginTop: 10,
  },
});
