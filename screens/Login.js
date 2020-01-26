import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

import { login } from "../actions/LoginActions";
import { setStorageItem } from "../actions/StorageActions";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

function Login(props) {
  const [code, setCode] = useState("");

  function handleLogin() {
    login(code)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        setStorageItem("jwt", data.result.jwt);
        console.log(props.navigation);
        props.navigation.navigate("EmployeeStart");
      })
      .catch(err => {
        // console.log(err);
      });
  }

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.Onboarding}
        style={{ width, height, zIndex: 1 }}
      >
        <Block flex middle>
          <KeyboardAvoidingView behavior="padding" disabled>
            <Block style={styles.registerContainer}>
              <Block flex={0.25} middle style={styles.socialConnect}>
                <Text color="#8898AA" size={16}>
                  Enter your company login code
                </Text>
              </Block>
              <Block flex>
                <Block flex center>
                  <View style={{ flex: 1 }}>
                    <Block
                      width={width * 0.8}
                      style={{ marginTop: 12 }}
                      center
                    >
                      <SmoothPinCodeInput
                        cellStyle={{
                          borderBottomWidth: 2,
                          borderColor: argonTheme.COLORS.MUTED
                        }}
                        placeholder="⭑"
                        codeLength={5}
                        cellStyleFocused={{
                          borderColor: argonTheme.COLORS.MUTED
                        }}
                        value={code}
                        textStyle={{ color: argonTheme.COLORS.MUTED }}
                        onTextChange={code => setCode(code)}
                        secureTextEntry={false}
                        keyboardType="default"
                      ></SmoothPinCodeInput>
                    </Block>

                    <Block middle>
                      <Button
                        color="primary"
                        style={styles.createButton}
                        onPress={handleLogin}
                      >
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          LOGIN
                        </Text>
                      </Button>
                    </Block>
                  </View>
                </Block>
              </Block>
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </ImageBackground>
    </Block>
  );
}

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.25,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 30
  }
});

export default Login;
