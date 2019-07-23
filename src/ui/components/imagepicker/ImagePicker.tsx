import {BaseComponent} from "../../BaseComponent";
import {ActivityIndicator, Image, TouchableWithoutFeedback, View} from "react-native";
import * as _ from "lodash";
import {style} from "./ImagePickerStyles";
import Icon from "react-native-vector-icons/Feather";
import {Variables} from "../../style";
import * as React from "react";
import RNImagePicker from "react-native-image-picker";
import {observer} from "mobx-react";
import LinearGradient from "react-native-linear-gradient";
import {rgba} from "polished";
import ImageResizer from "react-native-image-resizer";

export interface ImagePickerInfo {
  fileURI: string;
  fileName: string;
  fileType: string | undefined;
}

export interface ImagePickerProps {
  uri?: string;
  onChange: (info: ImagePickerInfo | null) => void;
  maxSize: number;
}

export interface ImagePickerState {
  loading: boolean;
}

@observer
export class ImagePicker extends BaseComponent<ImagePickerProps, ImagePickerState> {
  state = {
    loading: false,
  };

  protected handleCameraPress = () => {
    RNImagePicker.showImagePicker(
      {
        title: "Upload a picture!",
        storageOptions: {
          skipBackup: true,
          path: "images",
        },
        allowsEditing: true,
        rotation: 360,
      },
      async response => {
        const {onChange, maxSize} = this.props;

        if (response.didCancel || response.error) return;

        let size: number | undefined = response.fileSize;
        let fileURI = response.uri;
        const fileType = response.type;
        const fileName = !_.isNil(response.fileName) ? response.fileName : response.uri.lastIndexOf("/") > 0 ? response.uri.substring(response.uri.lastIndexOf("/")) : "filename";

        let quality = 90;

        while (size !== undefined && size > maxSize) {
          const resizeResponse = await ImageResizer.createResizedImage(fileURI, 1500, 1500, "JPEG", quality);

          if (resizeResponse.size === size) break;

          size = resizeResponse.size;
          fileURI = resizeResponse.uri;
          quality *= 0.9;
        }

        onChange({fileURI, fileType, fileName});
      }
    );
  };

  protected handleLoadStart = () => {
    this.setState({loading: true});
  };

  protected handleLoadEnd = () => {
    this.setState({loading: false});
  };

  render() {
    const {uri} = this.props;
    const {loading} = this.state;

    return (
      <TouchableWithoutFeedback onPress={this.handleCameraPress}>
        <View style={{marginBottom: 20}}>
          <View style={style.imageContainer}>{!_.isNil(uri) && <Image onLoadStart={this.handleLoadStart} onLoadEnd={this.handleLoadEnd} source={{uri}} style={style.image as any} />}</View>

          {loading && <ActivityIndicator size="large" color={Variables.whiteColor} style={style.activityIndicator} />}

          <LinearGradient style={style.gradient} colors={[rgba(255, 255, 255, 0), rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)]} />
          <Icon name="camera" size={38} style={style.pictureIcon} color={Variables.whiteColor} />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
