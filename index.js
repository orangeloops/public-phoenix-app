"use strict";

import "core-js/stable";
import "regenerator-runtime/runtime";
import "./config/env";

import * as React from "react";
import {AppRegistry, YellowBox} from "react-native";
import {App} from "./src/ui/App";

YellowBox.ignoreWarnings(["Remote debugger", "Async Storage", "Can't perform a React state update"]);

AppRegistry.registerComponent(process.env.APP_NAME, () => App);
