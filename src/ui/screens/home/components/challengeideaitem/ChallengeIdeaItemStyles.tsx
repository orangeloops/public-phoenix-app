import {StyleSheet} from "react-native";
import {Variables} from "../../../../style";

export const style = StyleSheet.create({
  container: {
    width: 150,
  },
  image: {
    width: 150,
    height: 150,
    backgroundColor: Variables.auxiliaryColor,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  title: {
    marginVertical: 5,
    marginRight: 5,
    fontSize: 16,
    fontWeight: "bold",
    flexShrink: 1,
  },
  description: {
    fontSize: 14,
    color: Variables.blackColor,
  },
  likesContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  likesNumber: {
    color: Variables.secondaryColor,
    fontSize: 16,
    fontWeight: "bold",
  },
  likesText: {
    fontSize: 10,
    fontWeight: "bold",
  },
});
