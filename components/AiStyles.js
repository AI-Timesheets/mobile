import { StyleSheet, Dimensions } from 'react-native';
import { HeaderHeight } from "../constants/utils";
import { Images, argonTheme } from "../constants";
import { Block, Checkbox, Text, theme } from "galio-framework";

const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;

export const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: height * 0.25,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  borderedHeading: {
    backgroundColor: argonTheme.COLORS.WHITE,
    paddingVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  aiButton: {
    width: width * 0.5,
    marginTop: 30
  },
  body: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    flex: 1
  },
  screenContainter: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1
  },
  screenBackground: {
    width: width,
    height: height
  },
  contentCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2
  },
  info: {
    paddingHorizontal: 40
  },
  middleImageContainer: {
    position: "relative",
    marginTop: -80
  },
  middleImage: {
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