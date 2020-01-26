import React, { useState, useEffect } from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";

const { height, width } = Dimensions.get("screen");

import { getStorageItem } from "../actions/StorageActions";

import argonTheme from "../constants/Theme";
import Images from "../constants/Images";

function Onboarding(props) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    getStorageItem("jwt").then(token => {
      setToken(token);
    });
  }, []);

  useEffect(() => {
    if (token) {
      props.navigation.navigate("EmployeeStart");
    }
  }, [token])

  return (
    <Block flex style={styles.container}>
      <StatusBar hidden />
      <Block flex center>
        <ImageBackground
          source={Images.Onboarding}
          style={{ height, width, zIndex: 1 }}
        />
      </Block>
      <Block center>
        <Image source={Images.LogoOnboarding} style={styles.logo} />
      </Block>
      <Block flex space="between" style={styles.padded}>
        <Block flex space="around" style={{ zIndex: 2 }}>
          <Block style={styles.title}>
            <Block>
              <Text color="white" size={40}>
                AI Timesheets
              </Text>
            </Block>
            <Block>
              <Text color="white" size={25}>
                Time Clock System
              </Text>
            </Block>
            <Block style={styles.subTitle}>
              <Text color="white" size={16}>
                Powered by facial recognition.
              </Text>
            </Block>
          </Block>
          <Block center>
            <Button
              style={styles.button}
              color={argonTheme.COLORS.SECONDARY}
              onPress={() => props.navigation.navigate("Login")}
              textStyle={{ color: argonTheme.COLORS.BLACK }}
            >
              Get Started
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: "relative",
    bottom: theme.SIZES.BASE,
    zIndex: 2
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0
  },
  logo: {
    width: 100,
    height: 100,
    zIndex: 2,
    position: "relative",
    marginTop: "-50%"
  },
  title: {
    marginTop: "-5%"
  },
  subTitle: {
    marginTop: 20
  }
});

export default Onboarding;
