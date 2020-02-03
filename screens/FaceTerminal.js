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
import { argonTheme } from "../constants";

const { width, height } = Dimensions.get("screen");

export default function FaceTerminal(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [loading, setLoading] = useState(false);
  const [clockInResponse, setClockInResponse] = useState({});
  const [recognizing, setRecognizing] = useState(false);
  const [error, setError] = useState("");
  const [recognizeResponse, setRecognizeResponse] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);

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

  useEffect(() => {
    if (camera !== undefined) {
      async function runRecognize() {
        await recognize();
      }

      runRecognize().then(() => {
        setRecognizing(false);
      });
    }

  }, [faceDetected]);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  async function _clockIn() {
    setLoading(true);

    const response = await clockInRequest(recognizeResponse.result.photo_id)
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
    setLoading(true);

    const response = await clockOutRequest(recognizeResponse.result.photo_id)
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
    if (!recognizing && camera !== undefined) {
      setRecognizing(true);
      let photo = await camera
        .takePictureAsync({
          quality: 0.2,
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
          setLoading(false);
        });

      // return response;
    } else {
      setFaceDetected(false);
    }
  }

  function faceDetect(detected) {
    if (detected.faces.length > 1) {
      setError("Multiple faces detected");
    } else if (detected.faces.length == 1 && !faceDetected) {
      setFaceDetected(true);
    }
  }

  function reset() {
    setLoading(false);
    setRecognizing(false);
    setRecognizeResponse(false);
    setFaceDetected(false);
  }
  return (
    <Camera
      style={{ flex: 1 }}
      type={Camera.Constants.Type.front}
      ref={ref => {
        camera = ref;
      }}
      onFacesDetected={faceDetect}
      faceDetectorSettings={{
        mode: FaceDetector.Constants.Mode.accurate,
        detectLandmarks: FaceDetector.Constants.Landmarks.none,
        minDetectionInterval: 100
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
            <BubbleText message={`${recognizeResponse.result.first_name} ${recognizeResponse.result.last_name} recognized \n Last clocked in: ${recognizeResponse.result.latest_clock_in[0].timestamp}`} />
          </Block>
        )}

        <Block flex bottom style={{ marginTop: height - 200 }}>
          <BubbleText message="Place your face within the camera view." color={argonTheme.COLORS.MUTED} />
        </Block>
        </Block>
        <Block flex end style={{ height: height, width: width }}>
          <Button
              full
              primary
              style={{
                flex: 0.5,
                alignSelf: "flex-end",
                alignItems: "center"
              }}
              onPress={image => {
                const employee = reset();
              }}
            >
              <Text style={{ fontSize: 18, color: "white" }}> Reset </Text>
            </Button>
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
                const employee = _clockIn();
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
                const response = _clockOut();

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
