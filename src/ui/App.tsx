import * as React from "react";
import {Root} from "./navigators";
import {BaseComponent} from "./BaseComponent";
import {YellowBox} from "react-native";
import {APIClient} from "../core/apiclient/APIClient";
import DeviceInfo from "react-native-device-info";

YellowBox.ignoreWarnings(["Remote debugger"]);

APIClient.configureClient({
  userAgent: DeviceInfo.getUserAgent(),
});

export class App extends BaseComponent {
  render() {
    const {appContainer} = this.appStore.navigationState;

    return <Root ref={appContainer} />;
  }
}
