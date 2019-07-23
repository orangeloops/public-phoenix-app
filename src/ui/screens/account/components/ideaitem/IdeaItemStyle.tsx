import {StyleSheet} from "react-native";
import {Variables} from "../../../../style";

const popoverItem = {
  padding: 5,
  minWidth: 70,
};

export const style = StyleSheet.create({
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
    backgroundColor: Variables.auxiliaryColor,
  },
  tabItemTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "50%",
  },
  tabItemTitle: {
    fontWeight: "bold",
    flexShrink: 1,
  },
  popoverItemEdit: {
    ...popoverItem,
  },
  popoverItemDelete: {
    ...popoverItem,
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
    marginLeft: 5,
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
});
