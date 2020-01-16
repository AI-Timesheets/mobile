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
import { getCompany } from '../actions/CompanyActions';

function Home(props) {
  const company = getCompany().then((response) => {
    return response.json();
  }).then((data) => {
    return data;
  });

  console.log(company);
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
              <Text style={styles.text2}>Clock Out</Text>
            </View>
          </ImageBackground>
          <View style={styles.form}>
          <Text style={styles.text3}>Clock In or Clock Out Below:</Text>
            <View style={styles.username}>
              <TouchableOpacity
                // onPress={}
                style={styles.button}
              >
                <Text style={styles.text2}>Clock In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                // onPress={}
                style={styles.button}
              >
                <Text style={styles.text2}>Clock Out</Text>
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
    flex: 1,
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

export default Home;
