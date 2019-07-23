import * as React from "react";
import {BaseComponent, BaseComponentProps} from "../../BaseComponent";
import {StyleSheet} from "react-native";

export interface HeaderViewProps extends BaseComponentProps {
  imagePath: any;
  imageStyle?: StyleSheet.NamedStyles<any>;

  title?: string | React.ReactNode;
  titleStyle?: StyleSheet.NamedStyles<any>;

  style?: StyleSheet.NamedStyles<any>;
}

export abstract class HeaderViewBase extends BaseComponent<HeaderViewProps, {}> {}
