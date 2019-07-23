import {NavigationParams, NavigationScreenProps} from "react-navigation";
import {BaseComponent, BaseComponentProps, BaseComponentState} from "../BaseComponent";

export interface BaseScreenProps<P = NavigationParams, O = any> extends BaseComponentProps, NavigationScreenProps<P, O> {}

export interface BaseScreenState extends BaseComponentState {}

export abstract class BaseScreen<P extends BaseScreenProps = BaseScreenProps, S extends BaseScreenState = BaseScreenState> extends BaseComponent<P, S> {}
