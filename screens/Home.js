import React, { Component, useState, useEffect } from "react";
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
import { Button, Icon } from "native-base";
// import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";
import { login } from "../actions/LoginActions";
import { setStorageItem } from "../actions/StorageActions";
import { getCompany } from "../actions/CompanyActions";

function getClock() {
  const [time, setTime] = useState({
    day: new Date().getDate(),
    month: new Date().toLocaleString("default", { month: "long" }),
    year: new Date().getFullYear(),
    hour: new Date().toLocaleString("deafult", { day: "2-digit" }),
    min: new Date().getMinutes(),
    sec: new Date().getSeconds()
  });

  const tick = () => {
    setTime({
      day: new Date().getDate(),
      month: new Date().toLocaleString("default", { month: "long" }),
      year: new Date().getFullYear(),
      hour: new Date().toLocaleString("deafult", { day: "2-digit" }),
      min: new Date().getMinutes(),
      sec: new Date().getSeconds()
    });
  };

  useEffect(() => {
    setInterval(tick, 1000);
  }, []);

  return (
    <>
      <Text
        style={{
          fontFamily: "HelveticaNeue-Bold",
          color: "rgba(255,255,255,1)",
          fontSize: 14,
          textAlign: "center"
        }}
      >
        {time.month} {time.day} {time.year}
      </Text>
      <Text
        style={{
          fontFamily: "HelveticaNeue-Bold",
          color: "rgba(255,255,255,1)",
          fontSize: 15,
          textAlign: "center"
        }}
      >
        {((time.hour + 11) % 12) + 1}:{time.min} {time.hour >= 12 ? "PM" : "AM"}
      </Text>
    </>
  );
}
function Home(props) {
  [company, setCompany] = useState({});

  useEffect(() => {
    getCompany()
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCompany(data.result);
      });
  }, []);

  // console.log(`comp ${JSON.stringify(company)}`);
  return (
    <View style={styles.root}>
      <View style={styles.background}>
        <View style={styles.rectStack}>
          <ImageBackground
            style={styles.rect}
            source={require("../assets/images/Gradient_LZGIVfZ.png")}
          >
            <View
              style={{
                alignSelf: "center",
                marginTop: 130
              }}
            >
              <Text
                style={{
                  fontFamily: "HelveticaNeue-Bold",
                  color: "rgba(255,255,255,1)",
                  fontSize: 30,
                  textAlign: "center"
                }}
              >
                {company.name}
              </Text>
              {getClock()}
            </View>
          </ImageBackground>
          <View
            style={{
              top: 290,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column"
            }}
          >
            <View>
              <TouchableOpacity
                style={{
                  width: 330,
                  marginTop: 20,
                  height: 250,
                  opacity: 1,
                  borderRadius: 5,
                  flexDirection: "row",
                  alignSelf: "center"
                }}
              >
                <Button
                  style={{
                    flex: 1,
                    paddingLeft: 10
                  }}
                  bordered
                  full
                  iconRight
                  light
                  onPress={() => props.navigation.navigate("Employee")}
                >
                  <Text style={styles.button_text}>Employee Start</Text>
                  <Icon
                    style={{ color: "rgba(255,255,255,1)", paddingLeft: 10 }}
                    name="arrow-forward"
                  />
                </Button>
              </TouchableOpacity>

              {/* <Text style={styles.button_text}>Employee Start</Text> */}
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
            <Text
              style={styles.needHelp}
              onPress={() => props.navigation.navigate("Help")}
            >
              Need Help?
            </Text>
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
  image: {
    width: 83,
    height: 83,
    marginLeft: 10
  },
  button: {
    flex: 1,
    backgroundColor: "rgba(178,255,102,1)",
    borderRadius: 5,
    justifyContent: "center"
  },
  text2: {
    color: "rgba(255,255,255,1)",
    alignSelf: "center"
  },
  button_text: {
    fontFamily: "Helvetica Neue",
    fontSize: 15,
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
