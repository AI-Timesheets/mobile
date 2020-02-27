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
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import { recognizeRequest, statusRequest } from "../actions/ClockInActions";
import getLoggedInCompany from "../util/token";

import BubbleText from "../components/BubbleText";
import ClockActionModal from "../components/ClockActionModal";

import { Icon } from "../components";
import { argonTheme } from "../constants";
import { isFullFace } from "../util/facedetector";

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
  const [status, setStatus] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  let camera = {};

  useEffect(() => {
    (async () => {
      const { cameraStatus } = await Camera.requestPermissionsAsync();
      const { locationStatus } = await Permissions.askAsync(Permissions.LOCATION);
      setHasPermission(cameraStatus === "granted" && locationStatus === "granted");
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (hasPermission == true) {
        const location = await Location.getCurrentPositionAsync();
        setCurrentLocation(location);
      }
    })();
  }, [hasPermission]);

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
          try {
            setRecognizeResponse(json.result);
          } catch (exception) {
            console.log(exception);
            setRecognizeResponse(false);
            setError(json);
            reset();
          }
          setLoading(false);
          return
        })
        .catch(exc => {
          reset();
        });

      const company = await getLoggedInCompany();

      const status = await statusRequest(recognizeResponse.employee.login_code, company)
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          console.log(json);
          if (json !== undefined && ! json.hasOwnProperty("error")) {
            setStatus(json.result.status)
          }
        });

      // return response;
    } else {
      setFaceDetected(false);
    }
  }

  function faceDetect(detected) {
    if (detected.faces.length > 1) {
      setError("Multiple faces detected");
    } else if (
      detected.faces.length == 1 &&
      isFullFace(detected.faces[0]) &&
      !faceDetected
    ) {
      setFaceDetected(true);
    }
  }

  function closeModal() {
    reset();
    setModalVisible(false);
  }

  function reset() {
    setLoading(false);
    setRecognizing(false);
    setRecognizeResponse(false);
    setFaceDetected(false);
  }

  if (hasPermission === null) {
    // TODO make a screen for this
    return <View />;
  }

  if (hasPermission === false) {
    // TODO make a screen for this
    return <Text>No access to camera</Text>;
  }


  return (
    <Camera
      style={{ flex: 1, height: height }}
      type={Camera.Constants.Type.front}
      ref={ref => {
        camera = ref;
      }}
      onFacesDetected={faceDetect}
      faceDetectorSettings={{
        mode: FaceDetector.Constants.Mode.accurate,
        detectLandmarks: FaceDetector.Constants.Landmarks.none,
        runClassifications: FaceDetector.Constants.Classifications.all,
        minDetectionInterval: 100
      }}
    >
      <Block style={styles.buttonColumn}>
        <TouchableOpacity style={{ zIndex: 3, width: 100 }}>
          <Button
            color="transparent"
            style={{ width: 100 }}
            onPress={() => props.navigation.navigate("EmployeeStart")}
          >
            <Text style={{ fontSize: 18, color: "white" }}> Back </Text>
          </Button>
        </TouchableOpacity>
        <TouchableOpacity style={{ zIndex: 3, width: 100 }}>
          <Button
            primary
            shadowless
            style={{ marginTop: 25, width: 100 }}
            onPress={() => reset()}
          >
            <Text style={{ fontSize: 18, color: "white" }}> Reset </Text>
          </Button>
        </TouchableOpacity>
      </Block>

      <Block
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          height: height,
          width: width
        }}
      >
        {recognizing && (
          <Block flex bottom style={{ marginTop: 300, width: 200 }}>
            <BubbleText>
              <Text style={styles.text}>Loading, please wait...</Text>
            </BubbleText>
          </Block>
        )}

        {recognizeResponse && (
          <Block flex center style={{ height: height, width: width }}>
            <ClockActionModal
              employee={recognizeResponse.employee}
              currentLocation={currentLocation}
              photo={recognizeResponse.photos[0]}
              status={status}
              closeModal={closeModal}
            />
          </Block>
        )}

        {!recognizeResponse && (
          <Block flex center style={{ marginTop: height - 200 }}>
            <BubbleText color={argonTheme.COLORS.MUTED}>
              <Text style={styles.text}>
                Place your face within the camera view.
              </Text>
            </BubbleText>
          </Block>
        )}
      </Block>
      <Block
        style={{
          zIndex: 2,
          alignSelf: 'center'
        }}
      >
        <TouchableOpacity style={{ zIndex: 3 }}>
          <Button
            color="muted"
            // style={{ width: 100 }}
            onPress={() => props.navigation.navigate("EmployeeLoginCode")}
          >
            <Text style={{ fontSize: 18, color: "white" }}>
              Use Login Code
            </Text>
          </Button>
        </TouchableOpacity>
      </Block>
    </Camera>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: "center",
    color: argonTheme.COLORS.WHITE
  },
  buttonColumn: {
    flex: 1,
    alignItems: "flex-end",
    paddingTop: 50,
    paddingRight: 15,
    zIndex: 2
  },
  button: {
    width: 75,
    alignSelf: "flex-end",
    alignItems: "center"
  }
});
