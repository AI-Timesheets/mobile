import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { getCompany } from "../actions/CompanyActions";
import { Button } from "../components";
import Clock from "../components/Clock";

import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

function EmployeeStart(props) {
  [company, setCompany] = useState({});
  [employee, setEmployee] = useState({});

  useEffect(() => {
    getCompany()
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data.exception) {
          props.navigation.navigate("Login")
        }
        setCompany(data.result);
      }).catch( err => {
        console.log(err);
      });
  }, []);

  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: "25%" }}
          >
            <Block flex style={styles.profileCard}>
              <Block middle style={styles.avatarContainer}>
                <Image source={Images.LogoOnboarding} style={styles.avatar} />
              </Block>
              <Block style={styles.info}>
                <Block middle style={{ marginTop: 20, paddingBottom: 24 }}>
                  <Text
                    bold
                    size={18}
                    color="#32325D"
                    style={{ marginBottom: 10 }}
                  >
                    {company.name}
                  </Text>
                  <Block row>
                    <Text
                      bold
                      size={14}
                      color="#525F7F"
                      style={{ paddingRight: 2 }}
                    >
                      2
                    </Text>
                    <Text size={14} color="#525F7F">
                      Currently Clocked In
                    </Text>
                  </Block>
                </Block>
              </Block>
              <Block flex>
                <Block middle>
                  <Clock />
                </Block>
                <Block middle style={{ marginTop: 30, marginBottom: 30 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block middle>
                  <Button
                    textStyle={{
                      color: theme.COLORS.WHITE,
                      padding: 6,
                      fontSize: 16
                    }}
                    style={{ textAlign: "center", width: "90%" }}
                    onPress={() => props.navigation.navigate("FaceTerminal")}
                  >
                    Employee Start
                  </Button>
                </Block>
                <Block middle style={{ marginTop: 30, marginBottom: 30 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block middle>
                  <Button
                    color="transparent"
                    textStyle={{
                      color: "#5E72E4",
                      fontSize: 12
                    }}
                    onPress={() => { props.navigation.navigate("CompanyLogout") }}
                  >
                    Log out company
                  </Button>
                </Block>
              </Block>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    // marginBottom: -HeaderHeight * 2,
    flex: 1
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  profileBackground: {
    width: width,
    height: height
  },
  profileCard: {
    // position: "relative",
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80
  },
  avatar: {
    width: 124,
    height: 124
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF"
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure
  }
});

export default EmployeeStart;
