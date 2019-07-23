import {StyleSheet} from "react-native";
import {Variables} from "../../style";

const inputStyle = {
  borderBottomWidth: 1,
  borderBottomColor: Variables.primaryColor,
  paddingHorizontal: 15,
  paddingVertical: 10,
  marginBottom: 20,
};

export const style = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: Variables.whiteColor,
  },
  scrollContentContainer: {
    padding: 20,
  },
  ideaTitle: {
    ...inputStyle,
  },
  ideaDescription: {
    ...inputStyle,
    height: 100,
  },
  datePickerContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  datePickerItem: {
    ...inputStyle,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "45%",
  },
  calendarText: {
    fontSize: 10,
    color: Variables.blackColor,
  },
  takePictureStyle: {
    marginTop: "auto",
    marginBottom: 15,
    alignSelf: "center",
  },

  modalFullScreen: {
    flexGrow: 1,
    backgroundColor: Variables.blackColor,
    opacity: 0.5,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
