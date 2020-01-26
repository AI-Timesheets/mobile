import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity } from "react-native";
import { Button, Spinner } from "galio-framework";
import { Camera } from "expo-camera";
import { clockInRequest, clockOutRequest } from "../actions/ClockInActions";

export default function FaceTerminal(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [loading, setLoading] = useState(false);
  const [clockInResponse, setClockInResponse] = useState({});
  let camera = {};

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    console.log(clockInResponse);
    if (clockInResponse) {
      props.navigation.navigate("Employee", {employee: clockInResponse.result})
    }
  }, [clockInResponse]);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function _clockIn() {
    let photo = await camera.takePictureAsync({
      base64: true
    });
    setLoading(true);

    const response = await clockInRequest(photo)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        setLoading(false);
        setClockInResponse(json);
      });

    return response;
  }

  async function _clockOut() {
    let photo = await camera.takePictureAsync({
      base64: true
    });
    setLoading(true);

    const response = await clockOutRequest(photo)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        setLoading(false);
        setClockInResponse(json);
      });

      return response;
  }

  if (loading) {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
              <View
                style={{
                  alignSelf: "center",
                  marginTop: 130
                }}
              >
                <Spinner
                  style={{
                    textAlign: "center"
                  }}
                />
              </View>
          </View>
        </View>
      </View>
    );
  }

  return (
    <Camera
      style={{ flex: 1 }}
      type={Camera.Constants.Type.front}
      ref={ref => {
        camera = ref;
      }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "transparent",
          flexDirection: "row"
        }}
      >
        {loading && <Spinner />}

        <Button
          full
          primary
          style={{
            flex: 0.5,
            alignSelf: "flex-end",
            alignItems: "center"
          }}
          onPress={image => {
            const employee = _clockIn(image);
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}> Clock In </Text>
        </Button>
        <Button
          full
          info
          style={{
            flex: 0.5,
            alignSelf: "flex-end",
            alignItems: "center"
          }}
          onPress={image => {
            const response = _clockOut(image);

            if (response.status == 'success') {
              props.navigation.navigate("Employee", {employee: employee})
            }
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>Clock Out</Text>
        </Button>
      </View>
    </Camera>
  );
}

const styles = StyleSheet.create({
  rect: {
    top: 0,
    left: 0,
    position: "absolute",
    right: 0,
    bottom: 0
  },
});