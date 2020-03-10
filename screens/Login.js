import React, { useState, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import {
  StyleSheet,
  ImageBackground,
  ScrollView,
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
import { styles } from '../components/AiStyles';

const { width, height } = Dimensions.get("screen");

function Login(props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  function handleLogin() {
    login(code)
      .then(resp => {
        return resp.json();
      })
      .then(data => {
        if (data.success) {
          setStorageItem("jwt", data.result.jwt);
          props.navigation.navigate("EmployeeStart");
        } else {
          setCode("");
          setError(true);
        }
      })
      .catch(err => {
        setCode("");
        setError(true);
      });
  }

  const openRegisterPage = async () => {
    let result = await WebBrowser.openBrowserAsync(
      "https://app.aitimesheets.com"
    );
  };

  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.screenContainter}
          imageStyle={styles.screenBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: "50%" }}
          >
            <Block flex style={styles.contentCard}>
              <Block style={styles.info}>
              <Block flex={0.25} middle style={styles.borderedHeading}>
                <Text color="#8898AA" size={16}>
                  Enter your company login code
                </Text>
              </Block>
                {/* <Block width={width * 0.8} style={{ marginTop: 12 }} center> */}
                <Block middle style={{ marginTop: 20, paddingBottom: 24 }}>
                  <SmoothPinCodeInput
                    cellStyle={{
                      borderBottomWidth: 2,
                      borderColor: argonTheme.COLORS.MUTED
                    }}
                    placeholder="•"
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
                  {error && (
                    <Text
                      style={{ paddingTop: 5 }}
                      size={12}
                      color={argonTheme.COLORS.ERROR}
                    >
                      Incorrect login code, please try again.
                    </Text>
                  )}
                  <Button
                    shadowless
                    color="primary"
                    style={styles.aiButton}
                    onPress={handleLogin}
                  >
                    <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                      LOGIN
                    </Text>
                  </Button>
                </Block>
                <Block flex={0.25} middle style={{ paddingVertical: 20 }}>
                  <Text color="#8898AA" size={16} onPress={openRegisterPage}>
                    Don't have one?
                  </Text>
                  <Text bold color="#8898AA" size={14} onPress={openRegisterPage}>
                  Tap here to register
                  </Text>
                </Block>
              </Block>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    </Block>
  );
}

export default Login;
