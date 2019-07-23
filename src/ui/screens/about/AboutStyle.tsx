import {StyleSheet} from "react-native";
import {Variables} from "../../style";

export const aboutStyle = StyleSheet.create({
  container: {
    backgroundColor: Variables.whiteColor,
  },
  scrollViewContentContainer: {
    flex: 1,
    backgroundColor: Variables.whiteColor,
    alignItems: "center",
    paddingTop: 33,
  },
  developedBy: {
    width: "80%",
    maxWidth: 150,
    textAlign: "center",
  },
  orangeloopsLogo: {
    width: "80%",
    maxWidth: 200,
    height: 75,
    marginVertical: 33,
  },
  termsOfUseText: {
    fontWeight: "bold",
    marginBottom: 22,
    textAlign: "center",
    letterSpacing: 2,
  },
  reviewText: {
    fontWeight: "bold",
    marginBottom: 11,
    textAlign: "center",
    letterSpacing: 2,
  },
  socialMediaContainer: {
    flexDirection: "row",
  },
  followUs: {
    marginBottom: 11,
  },
  twitterContainer: {
    marginRight: 22,
  },
  twitterImage: {
    width: 50,
    height: 50,
  },
  facebookContainer: {},
  facebookImage: {
    width: 50,
    height: 50,
  },
  version: {
    marginTop: 11,
    marginBottom: 33,
  },
});
