import * as React from "react";
import {Text, TextProps} from "react-native";
import {BaseComponent, BaseComponentProps, BaseComponentState} from "../BaseComponent";
import {Variables} from "../style";

export interface AppTextProps extends BaseComponentProps, TextProps {}

export interface AppTextState extends BaseComponentState {}

export class AppText extends BaseComponent<AppTextProps, AppTextState> {
  public static defaultStyles = {
    color: Variables.blackColor,
    fontFamily: "Montserrat-Regular",
  };

  render(): React.ReactNode {
    const {defaultStyles} = AppText;
    const {style} = this.props;

    return (
      <Text {...this.props} style={[defaultStyles, style]}>
        {this.props.children}
      </Text>
    );
  }
}
