import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  StatusBar
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { login } from '../actions/LoginActions';
import { setStorageItem } from '../actions/StorageActions';
import Home from "./Home2";

function Login(props) {
  const [code, setCode] = useState("");
  console.log(props);

  function handleLogin() {
    login(code).then(resp => {
      return resp.json()
    }).then(data => {
      setStorageItem("jwt", data.result.jwt);
      this.props.navigation.navigate("Home");
    })
    .catch(err => {
      console.log(err);
    });
  }

  return (
    <View style={styles.root}>
      <View style={styles.background}>
        <View style={styles.rectStack}>
          <ImageBackground
            style={styles.rect}
            imageStyle={styles.rect_imageStyle}
            source={require("../assets/images/Gradient_LZGIVfZ.png")}
          >
            <View style={styles.logo}>
              <Image
                source={require("../assets/images/aitime-logo.png")}
                resizeMode="contain"
                style={styles.image}
              ></Image>
            </View>
          </ImageBackground>
          <View style={styles.form}>
          <Text style={styles.text3}>Enter your company code below:</Text>
            <View style={styles.username}>
              <Icon name="key-minus" style={styles.icon22}></Icon>
              <SmoothPinCodeInput
                cellStyle={{
                  borderBottomWidth: 2,
                  borderColor: "white"
                }}
                codeLength={5}
                cellStyleFocused={{
                  borderColor: "#385373"
                }}
                value={code}
                textStyle={{color: "white"}}
                onTextChange={code => setCode(code)}
                secureTextEntry={false}
                style={styles.usernameInput}
                keyboardType="default"
              ></SmoothPinCodeInput>
            </View>
            <View style={styles.usernameFiller}></View>
            <View style={styles.username}>
              <TouchableOpacity
                onPress={handleLogin}
                style={styles.button}
              >
                <Text style={styles.text2}>Get Started</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.footerTexts}>
            <TouchableOpacity
              onPress={() => props.navigation.navigate("SignUp")}
              style={styles.button2}
            >
              <View style={styles.createAccountFiller}></View>
              <Text style={styles.createAccount}>Create Account</Text>
            </TouchableOpacity>
            <View style={styles.button2Filler}></View>
            <Text style={styles.needHelp}>Need Help?</Text>
          </View>
        </View>
      </View>
      <StatusBar
        animated={false}
        barStyle="light-content"
        hidden={false}
        backgroundColor="rgba(0,0,0,0)"
      ></StatusBar>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "rgb(255,255,255)"
  },
  background: {
    flex: 1
  },
  rect: {
    top: 0,
    left: 0,
    position: "absolute",
    right: 0,
    bottom: 0
  },
  rect_imageStyle: {
    // opacity: 0.99
  },
  logo: {
    width: 102,
    height: 111,
    marginTop: 130,
    marginLeft: 150
  },
  image: {
    width: 83,
    height: 83,
    marginLeft: 10
  },
  form: {
    top: 290,
    // left: 60,
    // width: 278,
    // height: 161,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column"
    // position: "absolute"
  },
  username: {
    width: 330,
    marginTop: 20,
    height: 59,
    backgroundColor: "rgba(251,247,247,0.25)",
    opacity: 1,
    borderRadius: 5,
    flexDirection: "row",
    alignSelf: "center"
  },
  icon22: {
    color: "rgba(255,255,255,1)",
    fontSize: 30,
    marginLeft: 20,
    alignSelf: "center"
  },
  usernameInput: {
    height: 30,
    color: "rgba(255,255,255,1)",
    flex: 1,
    marginRight: 11,
    marginLeft: 11,
    alignSelf: "center"
  },
  usernameFiller: {
    flex: 1
  },
  button: {
    height: 59,
    width: 330,
    backgroundColor: "rgba(31,178,204,1)",
    borderRadius: 5,
    justifyContent: "center"
  },
  text2: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  text3: {
    opacity: 0.76,
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  footerTexts: {
    left: 37,
    height: 14,
    position: "absolute",
    right: 36,
    bottom: 36,
    flexDirection: "row"
  },
  button2: {
    width: 104,
    height: 14,
    alignSelf: "flex-end"
  },
  createAccountFiller: {
    flex: 1
  },
  createAccount: {
    color: "rgba(255,255,255,0.5)"
  },
  button2Filler: {
    flex: 1,
    flexDirection: "row"
  },
  needHelp: {
    color: "rgba(255,255,255,0.5)",
    alignSelf: "flex-end",
    marginRight: -1
  },
  rectStack: {
    flex: 1
  }
});

export default Login;
