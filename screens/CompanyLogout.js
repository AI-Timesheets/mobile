import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  View,
  TouchableOpacity
} from "react-native";
import { Block, Checkbox, Text, theme } from "galio-framework";

import SmoothPinCodeInput from "react-native-smooth-pincode-input";

import { login } from "../actions/LoginActions";
import { setStorageItem, getStorageItem, deleteStorageItem } from "../actions/StorageActions";

import getLoggedInCompany from "../util/token";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { styles } from '../components/AiStyles';

const { width, height } = Dimensions.get("screen");

function CompanyLogout(props) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  async function handleLogout() {
    const company = await getLoggedInCompany();
    if (company.company_code.toUpperCase() == code.toUpperCase()) {
      setCode("");
      deleteStorageItem("jwt").then(() => {
        props.navigation.goBack();
      });
    } else {
      setCode("");
      setError(true);
    }
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
            <Block style={styles.container}>
              <Block row flex={0.5} style={styles.borderedHeading}>
                <Block
                  style={{
                    position: "absolute",
                    right: 0,
                    paddingTop: 10,
                    paddingRight: 10
                  }}
                >
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("EmployeeStart")}
                  >
                    <Icon
                      size={18}
                      family="FontAwesome"
                      name="times-circle"
                      color={argonTheme.COLORS.DARK}
                    />
                  </TouchableOpacity>
                </Block>
                <Block row middle center width={width * 0.9} style={{paddingTop: 5}}>
                  <Text color={argonTheme.COLORS.BLACK} size={16}>
                    Enter your company login code to logout
                  </Text>
                </Block>
              </Block>
              <Block flex center>
                <View style={{ flex: 1 }}>
                  <Block width={width * 0.8} style={{ marginTop: 12 }} center>
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
                      onTextChange={code => {
                        setCode(code);
                        setError(false);
                      }}
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
                      onPress={handleLogout}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        LOGOUT
                      </Text>
                    </Button>
                  </Block>
                </View>
              </Block>
            </Block>
          </KeyboardAvoidingView>
        </Block>
      </ImageBackground>
    </Block>
  );
}

export default CompanyLogout;
