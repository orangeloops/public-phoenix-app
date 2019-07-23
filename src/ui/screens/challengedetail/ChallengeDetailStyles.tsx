import {StyleSheet} from "react-native";
import {Variables} from "../../style";

export const style = StyleSheet.create({
  mainActivityIndicatorContainer: {
    backgroundColor: Variables.whiteColor,
    marginBottom: "auto",
    marginTop: "auto",
  },
  createdDataGradient: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    height: "100%",
  },
  privateDataContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginTop: 5,
    marginRight: 5,
  },
  privateDataText: {
    fontSize: 12,
  },
  privateDataIcon: {
    marginLeft: 5,
  },
  container: {
    flexGrow: 1,
    backgroundColor: Variables.whiteColor,
    position: "relative",
  },
  bottomContent: {
    backgroundColor: Variables.whiteColor,
    flexGrow: 1,
  },
  titleContainer: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
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
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
  },
  challengeTitle: {
    backgroundColor: Variables.whiteColor,
    fontSize: 24,
    fontWeight: "bold",
    marginHorizontal: 20,
    flexShrink: 1,
  },
  challengeDescription: {
    fontSize: 16,
    marginBottom: 20,
    marginHorizontal: 20,
  },
  panelContainer: {
    backgroundColor: Variables.auxiliaryColor,
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 15,
    justifyContent: "space-between",
  },
  createdDataContainer: {
    alignItems: "center",
    justifyContent: "space-between",
  },
  createdByImageContainer: {
    padding: 2,
    backgroundColor: Variables.primaryColor,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  createdByImage: {
    height: "100%",
    width: "100%",
    borderRadius: 25,
  },
  createdAt: {
    marginTop: 5,
  },
  datesContainer: {
    flexDirection: "row",
    flexShrink: 1,
  },
  dateTitle: {
    fontWeight: "bold",
    color: Variables.secondaryColor,
  },
  dateSubtitle: {},
  deadlineChallengeContainer: {
    alignItems: "flex-start",
    flexShrink: 1,
    justifyContent: "space-evenly",
  },
  datesSeparator: {
    backgroundColor: Variables.cloudyGrayColor,
    marginHorizontal: 10,
    width: 1,
  },
  deadlineIdeasContainer: {
    alignItems: "flex-end",
    justifyContent: "space-evenly",
    flexShrink: 1,
  },
  descriptionContainer: {
    backgroundColor: Variables.whiteColor,
    paddingVertical: 20,
    flexGrow: 1,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
    backgroundColor: Variables.whiteColor,
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
