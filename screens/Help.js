import * as React from "react";
import { Container, Text, Button } from "native-base";
import { View, ImageBackground } from "react-native";

export default class Help extends React.Component {
  render() {
    return (
      <Container>
        <View
          style={{
            flex: 2
          }}
        >
          <ImageBackground
            style={{
              top: 0,
              left: 0,
              position: "absolute",
              right: 0,
              bottom: 0
            }}
            source={require("../assets/images/Gradient_LZGIVfZ.png")}
          />
          <View
            style={{
              flex: 3,
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <Text
              style={{
                fontFamily: "Helvetica Neue",
                fontSize: 20,
                paddingLeft: 10,
                paddingTop: 10,
                color: "rgba(255,255,255,1)",
                alignSelf: "center"
              }}
            >
              AI Timesheets is a facial recognition powered clock-in and
              clock-out system.{" "}
            </Text>
            <Text
              style={{
                fontFamily: "Helvetica Neue",
                fontSize: 20,
                paddingLeft: 10,
                paddingTop: 10,
                fontWeight: "bold",
                color: "rgba(255,255,255,1)",
                alignSelf: "center"
              }}
            >
              Step 1
            </Text>
            <Text
              style={{
                fontFamily: "Helvetica Neue",
                fontSize: 18,
                paddingLeft: 10,
                paddingTop: 10,
                color: "rgba(255,255,255,1)",
                alignSelf: "center"
              }}
            >
              Press the Get Started button below.
            </Text>
            <Text
              style={{
                fontFamily: "Helvetica Neue",
                fontSize: 20,
                paddingLeft: 10,
                paddingTop: 10,
                fontWeight: "bold",
                color: "rgba(255,255,255,1)",
                alignSelf: "center"
              }}
            >
              Step 2
            </Text>
            <Text
              style={{
                fontFamily: "Helvetica Neue",
                fontSize: 18,
                paddingLeft: 10,
                paddingTop: 10,
                color: "rgba(255,255,255,1)",
                alignSelf: "center"
              }}
            >
              Take a picture of your face. Please make sure your whole face is
              within the camera Container.
            </Text>
            <Text
              style={{
                fontFamily: "Helvetica Neue",
                fontSize: 20,
                paddingLeft: 10,
                paddingTop: 10,
                fontWeight: "bold",
                color: "rgba(255,255,255,1)",
                alignSelf: "center"
              }}
            >
              Step 3
            </Text>
            <Text
              style={{
                fontFamily: "Helvetica Neue",
                fontSize: 18,
                paddingLeft: 10,
                paddingTop: 10,
                color: "rgba(255,255,255,1)",
                alignSelf: "center"
              }}
            >
              All set! Your manager will receive a notification that you have
              clocked in or out.
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              paddingLeft: 10,
              paddingTop: 10
            }}
          >
            <Button
              rounded
              success
              onPress={() => this.props.navigation.navigate("CameraView")}
            >
              <Text>Get Started</Text>
            </Button>
          </View>
        </View>
      </Container>
    );
  }
}
