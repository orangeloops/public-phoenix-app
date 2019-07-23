import * as React from "react";
import * as _ from "lodash";
import {Image, View} from "react-native";
import {style} from "./HeaderViewStyles";
import {HeaderViewBase} from "./HeaderViewBase";
import {AppText} from "../../components";

const logo = require("../../assets/logo.png");

export class HeaderView extends HeaderViewBase {
  render() {
    const {imagePath, imageStyle, title, titleStyle, style: containerStyle, children} = this.props;

    return (
      <View style={[style.container, containerStyle]}>
        <View style={style.headerContainer}>
          <Image source={imagePath} style={[style.headerImage, imageStyle]} />

          {_.isNil(title) ? (
            <Image style={{width: 180, marginRight: 10, resizeMode: "contain", alignSelf: "flex-end"}} source={logo} />
          ) : (
            !_.isNil(title) && (typeof title === "string" ? <AppText style={[style.title, titleStyle]}>{title}</AppText> : title)
          )}
        </View>

        {children}
      </View>
    );
  }
}
