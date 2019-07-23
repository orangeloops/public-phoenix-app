import {StyleSheet} from "react-native";
import {transparentize} from "polished";
import {Variables} from "../../style";

export const style = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: Variables.whiteColor,
  },
  userInfoWrapper: {
    backgroundColor: Variables.primaryColor,
    padding: 10,
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImageContainer: {
    height: 120,
    width: 120,
    position: "relative",
    marginRight: 20,
  },
  userImageBorder: {
    position: "absolute",
    height: 120,
    width: 120,
    borderRadius: 60,
    borderColor: Variables.whiteColor,
    borderWidth: 3,
  },
  userImage: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  userImageActivityIndicator: {
    position: "absolute",
    height: "100%",
    width: "100%",
    borderRadius: 60,
    backgroundColor: transparentize(0.4, Variables.blackColor),
  },
  editImageIconContainer: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderColor: Variables.whiteColor,
    borderWidth: 1,
    backgroundColor: Variables.secondaryColor,
    position: "absolute",
    bottom: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  editImageIcon: {
    height: 20,
    width: 20,
    resizeMode: "cover",
  },
  userNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  userName: {
    color: Variables.whiteColor,
    fontWeight: "bold",
    fontSize: 20,
    flexGrow: 1,
    flexShrink: 1,
  },
  editIcon: {
    height: 17,
    width: 17,
    resizeMode: "cover",
    marginLeft: 10,
  },
  cancelEditIcon: {
    height: 17,
    width: 17,
    marginLeft: 10,
  },
  closeIcon: {
    height: 24,
    width: 24,
    resizeMode: "cover",
    marginLeft: 10,
  },
  userInfo: {
    color: Variables.whiteColor,
  },
  userInfoContent: {
    height: 100,
    flex: 1,
  },
  userInfoContentEdit: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  userInfoInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
  },
  saveButtonContainer: {
    backgroundColor: Variables.whiteColor,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: Variables.primaryColor,
    fontWeight: "bold",
  },
  tabContainer: {
    backgroundColor: Variables.auxiliaryColor,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    paddingHorizontal: 15,
    height: 100,
  },
  tabButtonContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "33%",
  },
  tabButtonPrimaryText: {
    color: Variables.secondaryColor,
    fontSize: 40,
  },
  tabButtonSecondaryText: {
    color: Variables.blackColor,
    fontSize: 16,
  },
  activeTabButtonText: {
    fontWeight: "bold",
  },
  tabContentWrapper: {
    backgroundColor: Variables.whiteColor,
    flex: 1,
  },
  challengeList: {
    paddingHorizontal: 10,
  },
  ideaList: {
    paddingHorizontal: 10,
  },
  reactedIdeaList: {
    paddingHorizontal: 10,
  },
  nameInput: {
    flexGrow: 1,
    padding: 0,
    borderBottomWidth: 1,
    borderBottomColor: Variables.whiteColor,
    color: Variables.whiteColor,
    fontFamily: "Montserrat-Bold",
    fontSize: 20,
    marginBottom: 10,
  },
  tabContentContainer: {
    flexDirection: "row",
    height: 90,
    marginVertical: 12,
  },
  tabItemImage: {
    height: "100%",
    width: 130,
    resizeMode: "cover",
    marginRight: 10,
  },
  tabItemTitle: {
    fontWeight: "bold",
    height: "50%",
  },
  tabItemInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "50%",
    backgroundColor: Variables.thirdColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tabIdeaInfoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "50%",
  },
  likesContainer: {
    alignItems: "center",
    backgroundColor: Variables.thirdColor,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  likesQuantity: {
    color: Variables.secondaryColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  likesText: {
    fontSize: 10,
    fontWeight: "bold",
  },
  topIdeaTitle: {
    fontSize: 12,
    color: Variables.blackColor,
  },
  topIdeaContent: {
    color: Variables.primaryColor,
  },
  emptyListMessage: {
    textAlign: "center",
    padding: 10,
  },
  popoverLabelContainer: {
    width: 100,
    height: 40,
  },
  popoverButtonContainer: {
    height: "100%",
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  popoverButton: {},
  popoverItemLogOut: {},
});
