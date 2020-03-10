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
import Spinner from "react-native-loading-spinner-overlay";

import {
  getCompany,
  employeesClockedInRequest
} from "../actions/CompanyActions";
import { Button } from "../components";
import Clock from "../components/Clock";

import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { styles } from '../components/AiStyles';

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

function EmployeeStart(props) {
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState({});
  const [employee, setEmployee] = useState({});
  const [numClockedIn, setNumClockedIn] = useState(false);

  async function getEmployees() {
    const loggedInEmployees = await employeesClockedInRequest(company.id);
    return loggedInEmployees;
  }

  useEffect(() => {
    getCompany()
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (data.exception) {
          props.navigation.navigate("Login");
        } else {
          setCompany(data.result);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    async function getEmployeeCount() {
      return getEmployees();
    }

    if (company) {
      getEmployeeCount()
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          if (json.result) {
            setNumClockedIn(json.result.length);
          }
        });
    }
  }, [company]);

  if (loading) {
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
              <Spinner
                visible={loading}
                textContent={"Loading..."}
                textStyle={{ color: argonTheme.COLORS.WHITE }}
              />
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    </Block>;
  }

  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.screenContainter}
          imageStyle={styles.screenBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: "25%" }}
          >
            <Block flex style={styles.contentCard}>
              <Block middle style={styles.middleImageContainer}>
                <Image source={Images.LogoOnboarding} style={styles.middleImage} />
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
                  {numClockedIn !== false && (
                    <Block row>
                      <Text
                        bold
                        size={14}
                        color="#525F7F"
                        style={{ paddingRight: 2 }}
                      >
                        {JSON.stringify(numClockedIn)}
                      </Text>
                      <Text size={14} color="#525F7F">
                        Currently Clocked In
                      </Text>
                    </Block>
                  )}
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
                    onPress={() => {
                      props.navigation.navigate("CompanyLogout");
                    }}
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

export default EmployeeStart;
