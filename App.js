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
import Home from "./screens/Home2";
import Login from "./screens/Login";
import { getStorageItem } from "./actions/StorageActions";

export function HomeScreen() {
  const [code, setCode] = useState("");

  token = getStorageItem("jwt");
  console.log(token);

  if (token) {
    return (
      <Container>
        <Home />
      </Container>
    );
  }

  return (
    <Container>
      <Login />
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
    Home: Home,
    Login: Login
    // "How To Use": HowTo
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
