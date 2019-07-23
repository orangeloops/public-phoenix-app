import {BaseComponent} from "../../BaseComponent";
import * as React from "react";
import {CheckBox as RNECheckBox, CheckBoxProps as RNECheckBoxProps} from "react-native-elements";
import {style} from "./CheckBoxStyle";
import {TouchableWithoutFeedback} from "react-native";
import {Variables} from "../../style";

export interface CheckBoxProps extends RNECheckBoxProps {}

export class CheckBox extends BaseComponent<CheckBoxProps> {
  render(): React.ReactNode {
    const {props} = this;

    const Component = props.Component ? props.Component : TouchableWithoutFeedback;

    return <RNECheckBox Component={Component} checkedColor={Variables.primaryColor} uncheckedColor={Variables.primaryColor} {...this.props} wrapperStyle={[style.wrapper, props.wrapperStyle]} textStyle={[style.text, props.textStyle]} />;
  }
}
