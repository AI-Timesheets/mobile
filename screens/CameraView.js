import React, { useState, useEffect } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Button } from "native-base";
import { Camera } from "expo-camera";
import { clockInRequest } from "../actions/ClockInActions";

export default function CameraView() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [modalVisible, setModalVisible] = useState(false);

  let camera = {};

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

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
    clockInRequest(photo)
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
      });
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

        <Button
          full
          primary
          style={{
            flex: 0.5,
            alignSelf: "flex-end",
            alignItems: "center"
          }}
          onPress={image => {
            _clockIn(image);
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
            _clockIn(image);
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>Clock Out</Text>
        </Button>
      </View>
    </Camera>
  );
}
