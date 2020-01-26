import React, { useState, useEffect } from "react";
import { AppLoading } from 'expo';
import { Container, Text } from "native-base";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import * as Font from "expo-font";

import { getStorageItem } from "./actions/StorageActions";

import CameraView from "./screens/CameraView";
import Employee from "./screens/Employee";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Help from "./screens/Help";

export function HomeScreen(props) {
  const [code, setCode] = useState("");
  const [token, setToken] = useState(null);

  useEffect(() => {
    getStorageItem("jwt").then(token => {
      setToken(token);
    });
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

const RootStack = createStackNavigator(
  {
    "AI Timesheets": HomeScreen,
    "Time Clock": CameraView,
    Employee: Employee,
    Home: Home,
    Login: Login,
    Help: Help
  },
  {
    initialRouteName: "AI Timesheets"
  }
);

const AppContainer = createAppContainer(RootStack);
const fetchFonts = () => {
  return Font.loadAsync({
    montserrat: require("./assets/fonts/Montserrat-Regular.ttf")
  });
}

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount() {
    Font.loadAsync({
      montserrat: require("./assets/fonts/Montserrat-Regular.ttf")
    });
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }

    return <AppContainer />;
  }
}
