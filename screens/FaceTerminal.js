import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { Button, Spinner, Block } from "galio-framework";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import {
  clockInRequest,
  clockOutRequest,
  recognizeRequest
} from "../actions/ClockInActions";
import BubbleText from "../components/BubbleText";
const { width, height } = Dimensions.get("screen");

export default function FaceTerminal(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [loading, setLoading] = useState(false);
  const [clockInResponse, setClockInResponse] = useState({});
  const [recognizing, setRecognizing] = useState(false);
  const [recognizeResponse, setRecognizeResponse] = useState(false);
  let camera = {};

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    if (clockInResponse) {
      props.navigation.navigate("Employee", {
        employee: clockInResponse.result
      });
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

  async function recognize() {
    if (!recognizing) {
      setRecognizing(true);

      let photo = await camera
        .takePictureAsync({
          base64: true
        })
        .catch(err => {
          console.log(err);
        });

      const response = await recognizeRequest(photo)
        .then(response => {
          return response.json();
        })
        .then(json => {
          console.log(json);
          setRecognizing(false);
          setRecognizeResponse(json);
        });

      return response;
    }
  }

  return (
    <Camera
      style={{ flex: 1 }}
      type={Camera.Constants.Type.front}
      ref={ref => {
        camera = ref;
      }}
      onFacesDetected={recognize}
      faceDetectorSettings={{
        mode: FaceDetector.Constants.Mode.accurate,
        detectLandmarks: FaceDetector.Constants.Landmarks.none,
        runClassifications: FaceDetector.Constants.Classifications.all,
        minDetectionInterval: 100,
        tracking: true
      }}
    >
      <Block flex bottom style={{ height: height, width: width }}>
        {recognizing && (
          <Block flex bottom style={{ marginTop: 300, width: 200 }}>
            <BubbleText message={"Please wait..."} />
          </Block>
        )}

        {recognizeResponse && (
          <Block flex bottom style={{ marginTop: 300, width: 200 }}>
            <BubbleText message={`${recognizeResponse.name} recognized`} />
          </Block>
        )}

        <Block flex bottom style={{ marginTop: height - 200 }}>
          <BubbleText message="Place your face within the camera view." />
        </Block>

        {recognizeResponse && (
          <>
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

                if (response.status == "success") {
                  props.navigation.navigate("Employee", { employee: employee });
                }
              }}
            >
              <Text style={{ fontSize: 18, color: "white" }}>Clock Out</Text>
            </Button>
          </>
        )}
      </Block>
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
  }
});
