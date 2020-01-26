import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
  StatusBar
} from "react-native";
import { Button, Icon } from "native-base";
import { LinearGradient } from "expo-linear-gradient";
import { getCompany } from "../actions/CompanyActions";
import Clock from "../components/Clock";

function Home(props) {
  [company, setCompany] = useState({});
  [employee, setEmployee] = useState({});

  useEffect(() => {
    getCompany()
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCompany(data.result);
      });
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.background}>
        <View style={styles.rectStack}>
          <ImageBackground
            style={styles.rect}
            source={require("../assets/images/bg.png")}
          >
            <View
              style={{
                alignSelf: "center",
                marginTop: 130
              }}
            >
              <Text
                style={{
                  fontFamily: "montserrat",
                  color: "rgba(255,255,255,1)",
                  fontSize: 30,
                  textAlign: "center"
                }}
              >
                {company.name}
              </Text>
              <Clock />
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
                  onPress={() => props.navigation.navigate("Time Clock")}
                >
                  <Text style={styles.button_text}>Employee Start</Text>
                  <Icon
                    style={{ color: "rgba(255,255,255,1)", paddingLeft: 10 }}
                    name="arrow-forward"
                  />
                </Button>
              </TouchableOpacity>
            </View>
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
    fontFamily: "montserrat",
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
