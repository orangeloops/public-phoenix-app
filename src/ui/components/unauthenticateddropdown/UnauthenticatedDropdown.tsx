import {BaseComponent} from "../../BaseComponent";
import {View} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import {Variables} from "../../style";
import {AppText} from "../../components/AppText";
import PopoverTooltip from "react-native-popover-tooltip";
import * as React from "react";
import {styles} from "./UnauthenticatedDropdown.styles";

type UnauthenticatedDropdownProps = {
  onSignInSuccess?: () => void;
};

type UnauthenticatedDropdownState = {
  isTooltipOpen: boolean;
};

export class UnauthenticatedDropdown extends BaseComponent<UnauthenticatedDropdownProps, UnauthenticatedDropdownState> {
  state: UnauthenticatedDropdownState = {
    isTooltipOpen: false,
  };

  protected handleOpenTooltipMenu = () => {
    this.setState({isTooltipOpen: true});
  };

  protected handleCloseTooltipMenu = () => {
    this.setState({isTooltipOpen: false});
  };

  render() {
    const {onSignInSuccess} = this.props;
    const {isTooltipOpen} = this.state;
    const {navigationState} = this.appStore;

    return (
      <PopoverTooltip
        setBelow={false}
        onOpenTooltipMenu={this.handleOpenTooltipMenu}
        onCloseTooltipMenu={this.handleCloseTooltipMenu}
        tooltipContainerStyle={{marginTop: -15, marginLeft: -5}}
        labelContainerStyle={styles.popoverLabelContainer}
        buttonComponent={
          <View style={styles.popoverButtonContainer}>
            <Icon name={isTooltipOpen ? "x" : "more-vertical"} color={Variables.whiteColor} size={25} style={styles.popoverButton} />
          </View>
        }
        items={[
          {label: () => <AppText style={styles.popoverItemSignIn}>Sign in</AppText>, onPress: () => navigationState.navigateToSignIn({onSuccess: onSignInSuccess})},
          {label: () => <AppText style={styles.popoverItemSignUp}>Sign up</AppText>, onPress: () => navigationState.navigateToSignUp()},
          {label: () => <AppText style={styles.popoverItemAbout}>About</AppText>, onPress: () => navigationState.navigateToAbout()},
        ]}
      />
    );
  }
}
