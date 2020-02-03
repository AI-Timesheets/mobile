import React, { useState, useEffect } from "react";
import { Animated, View } from "react-native";
import { Block, Text } from "galio-framework";
import { argonTheme } from "../constants";

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
        width: 400,
        height: 50,
        justifyContent: "center"
      }}
    >
      <FadeInView
        style={{
          borderRadius: 25,
          backgroundColor: argonTheme.COLORS.PRIMARY,
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0
        }}
      ></FadeInView>
      <Text
        size={18}
        color={argonTheme.COLORS.WHITE}
        style={{ textAlign: "center" }}
      >
        {props.message}
      </Text>
    </Block>
  );
};
