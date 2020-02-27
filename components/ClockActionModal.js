import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import { Block, Button, Text, theme } from "galio-framework";
import Spinner from "react-native-loading-spinner-overlay";
import { Icon } from ".";
import { argonTheme } from "../constants";
import { clockInRequest, clockOutRequest } from "../actions/ClockInActions";
const { width, height } = Dimensions.get("screen");

export default function ClockActionModal({
  employee,
  currentLocation,
  photo,
  status,
  closeModal,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const [clockInResponse, setClockInResponse] = useState({});
  const [latestClockIn, setLatestClockIn] = useState("Never");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (employee.latest_clock_in.length > 0) {
      setLatestClockIn(employee.latest_clock_in[0].timestamp);
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {}, 3000);
  }, [done === true]);

  async function _clockIn() {
    setLoading(true);

    let latitude = null;
    let longitude = null;
    if (currentLocation && currentLocation.coords) {
      latitude = currentLocation.coords.latitude;
      longitude = currentLocation.coords.longitude;
    }

    const response = await clockInRequest(
      employee.login_code,
      photo.id,
      latitude,
      longitude
    ).then(response => {
        return response.json();
      })
      .then(json => {
        console.log(json);
        setLoading(false);
        setClockInResponse(json.result);
        setDone(true);
      });

    return response;
  }

  async function _clockOut() {
    setLoading(true);

    let latitude = null;
    let longitude = null;
    if (currentLocation && currentLocation.coords) {
      latitude = currentLocation.coords.latitude;
      longitude = currentLocation.coords.longitude;
    }

    const response = await clockOutRequest(
      employee.login_code,
      photo.id,
      latitude,
      longitude
    ).then(response => {
        return response.json();
      })
      .then(json => {
        setLoading(false);
        setClockInResponse(jso.result);
        setDone(true);
      });

    return response;
  }

  console.log(status);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={true}
      onRequestClose={() => closeModal()}
    >
      <Block flex column style={styles.modal}>
        <TouchableOpacity style={{ zIndex: 100 }} onPress={() => closeModal()}>
          <Block style={styles.close}>
            <Icon
              size={18}
              family="FontAwesome"
              name="times-circle"
              color={argonTheme.COLORS.DARK}
            />
          </Block>
        </TouchableOpacity>
        {done && (
          <Block middle style={{ paddingTop: 50 }}>
            <Image
              source={require("../assets/check.png")}
              style={{ width: 200, height: 200 }}
            />

            <Text
              bold
              style={{
                marginTop: 100,
                fontSize: 35,
                color: argonTheme.COLORS.BLACK
              }}
            >
              Success
            </Text>
          </Block>
        )}
        {!done && (
          <>
            <Block middle style={{ paddingTop: 50 }}>
              <Image
                source={{ uri: photo.url }}
                style={{ width: 200, height: 200 }}
              />
              <Spinner
                visible={loading}
                textContent={"Loading..."}
                textStyle={{ color: argonTheme.COLORS.WHITE }}
              />

              <Text
                bold
                style={{ fontSize: 25, color: argonTheme.COLORS.BLACK }}
              >
                {employee.first_name} {employee.last_name}
              </Text>
              {employee.latest_clock_in.length > 0 && (
                <Text
                  style={{
                    fontSize: 18,
                    textAlign: "center",
                    color: argonTheme.COLORS.BLACK
                  }}
                >
                  Last clocked in: {employee.latest_clock_in[0].timestamp}
                </Text>
              )}
            </Block>
            <Block flex row middle>
              {status === "CLOCKED_IN" && (
                <Button
                  info
                  shadowless
                  style={{
                    width: 120
                  }}
                  onPress={image => {
                    _clockOut();
                  }}
                >
                  <Text style={{ fontSize: 18, color: "white" }}>
                    Clock Out
                  </Text>
                </Button>
              )}
              {status !== "CLOCKED_IN" && (
                <Button
                  primary
                  shadowless
                  style={{
                    width: 120,
                    marginRight: 40
                  }}
                  onPress={image => {
                    _clockIn();
                  }}
                >
                  <Text style={{ fontSize: 18, color: "white" }}>
                    {" "}
                    Clock In{" "}
                  </Text>
                </Button>
              )}
            </Block>
          </>
        )}
      </Block>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    marginVertical: 200,
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
  },
  close: {
    position: "absolute",
    right: 0,
    paddingTop: 10,
    paddingRight: 15
  }
});
