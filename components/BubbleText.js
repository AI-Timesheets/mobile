import React, { useState, useEffect } from "react";
import { Animated, Dimensions, View } from "react-native";
import { Block, Text } from "galio-framework";
import { argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

const FadeInView = props => {
  const [fadeAnim] = useState(new Animated.Value(0.6)); // Initial value for opacity: 0

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          fromValue: 0.6,
          toValue: 0.2,
          duration: 500,
          delay: 1000
        }),
        Animated.timing(fadeAnim, {
          fromValue: 0.2,
          toValue: 0.6,
          duration: 1000
        })
      ])
    ).start();
  });

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

// You can then use your `FadeInView` in place of a `View` in your components:
export default props => {
  const color = props.color ? props.color : argonTheme.COLORS.PRIMARY;
  const timeout = props.timeout ? props.timeout : null;
  const [isHidden, setHidden] = useState(false);

  if (isHidden) {
    return (
      <></>
    )
  }
  useEffect(() => {
    if (timeout) {
      setTimeout(function(){ setHidden(true) }, timeout);
    }
  }, []);

  return (
    <Block
      style={{
        width: width - 50,
        height: 100,
        justifyContent: "center",
        alignItems: 'center',
      }}
    >
      <FadeInView
        style={{
          borderRadius: 10,
          backgroundColor: color,
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      />
        {props.children}
    </Block>
  );
};
