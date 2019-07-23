import {StyleSheet} from "react-native";
import {Variables} from "../../../style";

export const style = StyleSheet.create({
  container: {
    height: "50%",
    marginTop: "auto",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Variables.whiteColor,
    shadowColor: "rgba(0,0,0,0.7)",
    shadowOffset: {width: 20, height: 20},
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  closeModalButtonContainer: {
    width: "100%",
    backgroundColor: Variables.primaryColor,
  },
  closeModalButtonText: {
    padding: 15,
    color: Variables.whiteColor,
    textAlign: "center",
    fontWeight: "bold",
  },
});
