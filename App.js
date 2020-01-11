import React, { useState, useEffect } from "react";
import {
  Container,
  Text,
  Header,
  Content,
  Item,
  Input,
  Icon,
  Button,
  Card,
  CardItem,
  Left,
  Thumbnail,
  Body,
  Right
} from "native-base";

import { Image, Linking, KeyboardAvoidingView } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import SmoothPinCodeInput from "react-native-smooth-pincode-input";

import getTheme from "./native-base-theme/components";
import material from "./native-base-theme/variables/material";

import CameraView from "./screens/CameraView";
import HowTo from "./screens/HowTo";

export function HomeScreen() {
  const [code, setCode] = useState("");

  return (
    <Container>
      {/* <Content
        contentContainerStyle={{
          flex: 1,
        }}
      >

      </Content> */}
      <Content
        contentContainerStyle={{
          flex: 3,
          // paddingHorizontal: 20,
          backgroundColor: "#385373"
        }}
      >
        <Card>
          <CardItem bordered={false} >
            <Thumbnail source={require("./assets/aitime-logo.png")} />
            <Body>
              <Text>Facial Recognition Clock-in and Clock-out</Text>
              <Text note>Don't have an account? </Text>
              <Button
                rounded
                onPress={() => {
                  Linking.openURL("https://app.aitimesheets.com/signup");
                }}
              >
                <Text>Sign up</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
        <Text style={{ color: "white", textAlign: "center" }}>
          Please enter your company code below.
        </Text>
      </Content>
      <Content
        contentContainerStyle={{
          flex: 4,
          paddingHorizontal: 20,
          backgroundColor: "#385373",
          alignItems: "center"
        }}
      >
        <SmoothPinCodeInput
          cellStyle={{
            borderBottomWidth: 2,
            borderColor: "white"
          }}
          codeLength={5}
          cellStyleFocused={{
            borderColor: "black"
          }}
          value={code}
          onTextChange={code => setCode(code)}
        />
      </Content>
      <Content
        contentContainerStyle={{
          flex: 5,
          paddingHorizontal: 20,
          backgroundColor: "#385373",
          alignItems: "center"
        }}
      >
        <Button
          rounded
          success
          onPress={() => this.props.navigation.navigate("CameraView")}
        >
          <Text>Get Started</Text>
        </Button>
      </Content>
    </Container>
  );
}

class DetailsScreen extends React.Component {
  render() {
    return (
      <Container
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
      >
        <Text>Details Screen</Text>
      </Container>
    );
  }
}

const RootStack = createStackNavigator(
  {
    "AI Timesheets": HomeScreen,
    CameraView: CameraView,
    "How To Use": HowTo
  },
  {
    initialRouteName: "AI Timesheets"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
