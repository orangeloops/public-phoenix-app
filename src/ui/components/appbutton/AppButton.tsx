import * as React from "react";
import * as _ from "lodash";
import {StyleProp, TextStyle, TouchableOpacity, ViewStyle} from "react-native";
import {BaseComponent, BaseComponentProps, BaseComponentState} from "../../BaseComponent";
import {AppText} from "../AppText";
import Icon from "react-native-vector-icons/Feather";
import {style} from "./AppButtonStyle";
import {Variables} from "../../style";

export interface AppButtonProps extends BaseComponentProps {
  onPress: () => void;
  isPrimary?: boolean;

  icon?: string | React.ReactNode;
  iconColor?: string;
  iconStyle?: StyleProp<ViewStyle | TextStyle>;
  iconSize?: number;

  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;

  children: string;
}

export interface AppButtonState extends BaseComponentState {}

export class AppButton extends BaseComponent<AppButtonProps, AppButtonState> {
  render(): React.ReactNode {
    let {onPress, isPrimary, icon, iconColor, iconStyle, iconSize, style: customStyle, textStyle} = this.props;

    if (_.isNil(isPrimary)) isPrimary = true;

    return (
      <TouchableOpacity onPress={onPress} style={[isPrimary ? style.primaryContainer : style.secondaryContainer, !_.isNil(icon) ? style.containerWithIcon : style.containerWithoutIcon, customStyle]}>
        {typeof icon === "string" ? <Icon name={icon} size={!_.isNil(iconSize) ? iconSize : 20} color={!_.isNil(iconColor) ? iconColor : isPrimary ? Variables.whiteColor : Variables.primaryColor} style={[style.icon, iconStyle]} /> : icon}

        <AppText style={[isPrimary ? style.primaryText : style.secondaryText, textStyle]} numberOfLines={1}>
          {this.props.children}
        </AppText>
      </TouchableOpacity>
    );
  }
}
