import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
  Modal
} from "react-native";
import { Button, Spinner, Block, theme } from "galio-framework";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";

import {
  clockInRequest,
  clockOutRequest,
  recognizeRequest
} from "../actions/ClockInActions";

import BubbleText from "../components/BubbleText";
import {Icon } from "../components";
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
  const [modalVisibile, setModalVisible] = useState(false);

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
    if (camera !== undefined && faceDetected === true && !recognizeResponse) {
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
    if (!recognizing && camera !== undefined && camera !== {}) {
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
    console.log(detected.faces.length);

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
      <Block
        style={{
          top: 0,
          right: 0,
          paddingTop: 15,
          paddingRight: 15,
          position: "absolute"
        }}
      >
        <Button
          primary
          style={{
            width: 75,
            alignSelf: "flex-end",
            alignItems: "center"
          }}
          onPress={image => {
            const employee = reset();
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}> Reset </Text>
        </Button>
      </Block>
      <Block flex center style={{ height: height, width: width }}>
        {recognizing && (
          <Block flex bottom style={{ marginTop: 300, width: 200 }}>
            <BubbleText>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  color: argonTheme.COLORS.WHITE
                }}
              >
                Loading, please wait...
              </Text>
            </BubbleText>
          </Block>
        )}

        {recognizeResponse && (
          <Block flex center style={{ height: height, width: width }}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={true}
              onRequestClose={() => reset()}
            >
              <Block
                flex
                column
                style={{
                  marginVertical: 250,
                  backgroundColor: argonTheme.COLORS.WHITE,
                  padding: theme.SIZES.BASE,
                  marginHorizontal: theme.SIZES.BASE,

                  borderRadius: 6,
                  backgroundColor: theme.COLORS.WHITE,
                  shadowColor: "black",
                  shadowOffset: { width: 0, height: 0 },
                  shadowRadius: 8,
                  shadowOpacity: 0.2,
                  zIndex: 2
                }}
              >
                <Block
                  style={{
                    position: "absolute",
                    right: 0,
                    paddingTop: 10,
                    paddingRight: 10
                  }}
                >
                    <Icon
                      size={18}
                      family="FontAwesome"
                      name="times-circle"
                      color={argonTheme.COLORS.DARK}
                    />
                </Block>
                <Block middle style={{ paddingTop: 50 }}>
                  <Text
                    bold
                    style={{ fontSize: 25, color: argonTheme.COLORS.BLACK }}
                  >
                    {recognizeResponse.result.first_name}{" "}
                    {recognizeResponse.result.last_name}
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      textAlign: "center",
                      color: argonTheme.COLORS.BLACK
                    }}
                  >
                    Last clocked in:{" "}
                    {recognizeResponse.result.latest_clock_in[0].timestamp}
                  </Text>
                </Block>
                <Block flex row middle>
                      <Button
                        primary
                        shadowless
                        style={{
                          width: 120,
                          marginRight: 40
                        }}
                        onPress={image => {
                          const employee = _clockIn();
                        }}
                      >
                        <Text style={{ fontSize: 18, color: "white" }}>
                          {" "}
                          Clock In{" "}
                        </Text>
                      </Button>
                      <Button
                        info
                        shadowless
                        style={{
                          width: 120
                        }}
                        onPress={image => {
                          const response = _clockOut();

                          if (response.status == "success") {
                            props.navigation.navigate("Employee", {
                              employee: employee
                            });
                          }
                        }}
                      >
                        <Text style={{ fontSize: 18, color: "white" }}>
                          Clock Out
                        </Text>
                      </Button>
                </Block>
              </Block>
            </Modal>
          </Block>
        )}

        {!recognizeResponse && (
          <Block flex center style={{ marginTop: height - 200 }}>
            <BubbleText color={argonTheme.COLORS.MUTED}>
              <Text
                style={{
                  fontSize: 20,
                  textAlign: "center",
                  color: argonTheme.COLORS.WHITE
                }}
              >
                Place your face within the camera view.
              </Text>
            </BubbleText>
          </Block>
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
