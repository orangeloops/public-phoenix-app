import * as React from "react";
import {DataStore} from "../core";
import {AppStore} from "./store/AppStore";

export interface BaseComponentProps {}

export interface BaseComponentState {}

export abstract class BaseComponent<P extends BaseComponentProps = BaseComponentProps, S extends BaseComponentState = BaseComponentState> extends React.Component<P, S> {
  public state = {} as S;

  protected dataStore = new DataStore();
  protected appStore = new AppStore();
}
