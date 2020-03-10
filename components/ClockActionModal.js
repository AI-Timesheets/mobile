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
import * as Location from "expo-location";

import { Icon } from ".";
import { argonTheme } from "../constants";
import { clockInRequest, clockOutRequest } from "../actions/ClockInActions";
const { width, height } = Dimensions.get("screen");

export default function ClockActionModal({
  employee,
  photo,
  status,
  closeModal,
  ...props
}) {
  const [loading, setLoading] = useState(false);
  const [clockInResponse, setClockInResponse] = useState({});
  const [latestClockIn, setLatestClockIn] = useState("Never");
  const [done, setDone] = useState(false);
  const [location, setLocation] = useState(false);

  async function getLocation() {
    return await Location.getCurrentPositionAsync();
  }

  useEffect(() => {
    if (!location) {
      getLocation().then(loco => {
        setLocation(loco);
      });
    }
  });

  useEffect(() => {
    if (employee.latest_clock_in.length > 0) {
      setLatestClockIn(employee.latest_clock_in[0].timestamp);
    }
  }, []);

  useEffect(() => {
    setTimeout(closeModal, 15000);
  }, [done === true]);

  async function _clockIn() {
    setLoading(true);

    let latitude = null;
    let longitude = null;
    if (location && location.coords) {
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;
    }

    const response = await clockInRequest(
      employee.login_code,
      photo.id,
      latitude,
      longitude
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        setLoading(false);
        setClockInResponse(json.result);
        setDone(true);
      });

    closeModal();
    return response;
  }

  async function _clockOut() {
    setLoading(true);

    let latitude = null;
    let longitude = null;
    if (location && location.coords) {
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;
    }

    const response = await clockOutRequest(
      employee.login_code,
      photo.id,
      latitude,
      longitude
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        setLoading(false);
        setClockInResponse(json.result);
        setDone(true);
      });
    closeModal();
    return response;
  }

  const convertDate = date => {
    const dateObj = new Date(date);

    return (
      dateObj.toLocaleString("default", { month: "long" }) +
      " " +
      dateObj.getDate() +
      " " +
      dateObj.getFullYear() +
      " \n" +
      dateObj.toLocaleString("default", {
        minute: "2-digit",
        hour: "2-digit",
        second: "2-digit"
      })
    );
  };

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
                <>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: "bold",
                      textAlign: "center",
                      paddingTop: 15,
                      color: argonTheme.COLORS.BLACK
                    }}
                  >
                    Last clocked in:
                  </Text>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: "",
                      textAlign: "center",
                      color: argonTheme.COLORS.BLACK
                    }}
                  >
                    {convertDate(employee.latest_clock_in[0].timestamp)}
                  </Text>
                </>
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
