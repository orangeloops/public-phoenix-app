import * as React from "react";
import {Animated, StyleProp, ViewStyle} from "react-native";

export interface FadeProps {
  visible: boolean;
  style?: StyleProp<ViewStyle>;
}

export interface FadeState {
  _this: Fade;
  visible: boolean;
}

export class Fade extends React.Component<FadeProps, FadeState> {
  public state: FadeState = {
    _this: this,
    visible: this.props.visible,
  };

  protected visibility = new Animated.Value(this.props.visible ? 1 : 0);

  public static getDerivedStateFromProps(nextProps: Readonly<FadeProps>, prevState: FadeState): Partial<FadeState> | null {
    const {_this} = prevState;
    let newState: Partial<FadeState> | null = null;

    if (nextProps.visible === prevState.visible) return null;

    if (nextProps.visible) _this.setState({visible: true});

    Animated.timing(_this.visibility, {
      toValue: nextProps.visible ? 1 : 0,
      duration: 500,
    }).start(({finished}) => {
      if (finished) _this.setState({visible: nextProps.visible});
    });

    return newState;
  }

  render() {
    const {visibility} = this;
    const {visible, style, children, ...rest} = this.props;
    const {visible: stateVisible} = this.state;

    const containerStyle = {
      backgroundColor: "transparent",
      opacity: visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.2, 1],
          }),
        },
      ],
    };
    const combinedStyle = [containerStyle, style];

    return (
      <Animated.View style={stateVisible ? combinedStyle : containerStyle} {...rest}>
        {stateVisible ? children : null}
      </Animated.View>
    );
  }
}
