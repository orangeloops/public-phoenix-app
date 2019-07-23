import {BaseScreen, BaseScreenProps} from "../BaseScreen";
import * as React from "react";
import ImageZoomViewer from "react-native-image-zoom-viewer";
import {IImageInfo} from "react-native-image-zoom-viewer/src/image-viewer.type";
import {Variables} from "../../style";

export interface ImageViewerProps extends BaseScreenProps {}

export class ImageViewer extends BaseScreen<ImageViewerProps> {
  public static navigationOptions = {
    headerTintColor: Variables.whiteColor,
    headerTransparent: true,
  };

  protected images: IImageInfo[];

  constructor(props: BaseScreenProps) {
    super(props);

    const {navigation} = this.props;
    this.images = navigation.getParam("images");
  }

  render(): React.ReactNode {
    const {images} = this;
    const {navigationState} = this.appStore;

    return <ImageZoomViewer imageUrls={images} saveToLocalByLongPress={false} enableSwipeDown={true} onSwipeDown={navigationState.goBack} renderIndicator={() => <React.Fragment />} />;
  }
}
