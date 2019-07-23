import * as React from "react";
import {BaseScreen, BaseScreenProps, BaseScreenState} from "../BaseScreen";
import {UnauthenticatedDropdown} from "../../components";
import {Variables} from "../../style";

export interface HomeProps extends BaseScreenProps {}

export interface HomeState extends BaseScreenState {}

export abstract class HomeBase extends BaseScreen<HomeProps, HomeState> {
  public static navigationOptions = ({navigation}: any) => {
    const {params} = navigation.state;

    return {
      header: params && params.header,
      headerTitle: params && params.showInput ? params.searchInput : "HOME",
      headerTitleStyle: {
        color: Variables.whiteColor,
        fontSize: 20,
      },
      headerStyle: {
        backgroundColor: Variables.primaryColor,
      },
      headerRight: params && params.signInButton,
    };
  };

  public componentDidMount() {
    const {navigation} = this.props;
    const {isAuthenticated} = this.dataStore.userState;

    // navigation.setParams({
    //   searchIcon: (
    //     <TouchableOpacity
    //       onPress={() =>
    //         navigation.setParams({
    //           showInput: true,
    //         })
    //       }>
    //       <Icon name="search" size={23} style={{padding: 11}} color="white" />
    //     </TouchableOpacity>
    //   ),
    //   searchInput: (
    //     <View style={{backgroundColor: "white", flexGrow: 1, alignSelf: "stretch"}}>
    //       <TextInput
    //         returnKeyType="search"
    //         placeholder="Find a challenge 🤓"
    //         autoFocus={true}
    //         onBlur={() => navigation.setParams({showInput: false})}
    //         onChangeText={search => (this.textSearch = search)}
    //         style={{
    //           fontFamily: "Montserrat-Regular",
    //           borderWidth: 1,
    //           borderColor: "grey",
    //           alignSelf: "stretch",
    //           flexGrow: 1,
    //           paddingHorizontal: 10,
    //         }}
    //       />
    //     </View>
    //   ),
    // }); TODO-SG: implement

    if (!isAuthenticated) {
      navigation.setParams({
        signInButton: <UnauthenticatedDropdown />,
      });
    }

    this.fetchChallengeList();
  }

  fetchChallengeList = () => {
    const {challengeState} = this.dataStore;

    challengeState.fetchChallengeList();
  };
}
