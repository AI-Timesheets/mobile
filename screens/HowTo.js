import * as React from 'react';
import { Container, Text, Button } from 'native-base';

export default class HowTo extends React.Component {
  render() {
    return (
      <Container style={{ flex: 1, alignItems: "center" }}>
        <Container
          style={{
            flex: 1,
            alignItems: "left",
            paddingLeft: 10,
            paddingTop: 10,
            paddingRight: 10
          }}
        >
          <Text
            style={{
              fontFamily: "Helvetica Neue",
              fontSize: 20,
              paddingLeft: 10,
              paddingTop: 10
            }}
          >
            AI Timesheets is a facial recognition powered clock-in and clock-out
            system.{" "}
          </Text>
          <Text
            style={{
              fontFamily: "Helvetica Neue",
              fontSize: 20,
              paddingLeft: 10,
              paddingTop: 10,
              fontWeight: "bold"
            }}
          >
            Step 1
          </Text>
          <Text
            style={{
              fontFamily: "Helvetica Neue",
              fontSize: 18,
              paddingLeft: 10,
              paddingTop: 10
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
              fontWeight: "bold"
            }}
          >
            Step 2
          </Text>
          <Text
            style={{
              fontFamily: "Helvetica Neue",
              fontSize: 18,
              paddingLeft: 10,
              paddingTop: 10
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
              fontWeight: "bold"
            }}
          >
            Step 3
          </Text>
          <Text
            style={{
              fontFamily: "Helvetica Neue",
              fontSize: 18,
              paddingLeft: 10,
              paddingTop: 10
            }}
          >
            All set! Your manager will receive a notification that you have
            clocked in or out.
          </Text>
        </Container>
        <Container
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
        </Container>
      </Container>
    );
  }
}
