import React, { useState, useEffect } from "react";
import { Container, Text } from "native-base";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { getStorageItem } from "./actions/StorageActions";

import CameraView from "./screens/CameraView";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Help from "./screens/Help";

export function HomeScreen(props) {
  const [code, setCode] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    getStorageItem("jwt").then((token) => {
      setToken(token)
    })
  }, []);

  if (token) {
    console.log(token);
    return (
      <Container>
        <Home navigation={props.navigation} />
      </Container>
    );
  }

  return (
    <Container>
      <Login navigation={props.navigation} />
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
    "Employee": CameraView,
    Home: Home,
    Login: Login,
    Help: Help
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
