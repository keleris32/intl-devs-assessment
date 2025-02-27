import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const SIZES = {
  h1: hp("4%"), // ~32px
  h2: hp("3.5%"), // ~28px
  h3: hp("3%"), // ~24px
  h4: hp("2.5%"), // ~20px

  l1: hp("2%"), // ~16px
  l2: hp("1.75%"), // ~14px
  l3: hp("1.5%"), // ~12px

  ps1: hp("2%"), // ~16px
  ps2: hp("1.75%"), // ~14px
  ps3: hp("1.5%"), // ~12px

  pr1: hp("2%"), // ~16px
  pr2: hp("1.75%"), // ~14px
  pr3: hp("1.5%"), // ~12px

  width,
  height,
};

export const FONTS = {
  h1: {
    fontFamily: "JoyRide",
    fontSize: SIZES.h1,
    lineHeight: 40,
  },
  h2: { fontFamily: "JoyRide", fontSize: SIZES.h2, lineHeight: 40 },
  h3: { fontFamily: "JoyRide", fontSize: SIZES.h3, lineHeight: 32 },
  h4: { fontFamily: "JoyRide", fontSize: SIZES.h4, lineHeight: 28 },

  l1: { fontFamily: "JoyRide", fontSize: SIZES.l1, lineHeight: 28 },
  l2: { fontFamily: "JoyRide", fontSize: SIZES.l2, lineHeight: 26 },
  l3: { fontFamily: "JoyRide", fontSize: SIZES.l3, lineHeight: 26 },

  ps1: { fontFamily: "Inter", fontSize: SIZES.ps1, lineHeight: 28 },
  ps2: { fontFamily: "Inter", fontSize: SIZES.ps2, lineHeight: 26 },
  ps3: { fontFamily: "Inter", fontSize: SIZES.ps3, lineHeight: 26 },

  pr1: { fontFamily: "Segoe UI Regular", fontSize: SIZES.pr1, lineHeight: 28 },
  pr2: { fontFamily: "Segoe UI Regular", fontSize: SIZES.pr2, lineHeight: 26 },
  pr3: { fontFamily: "Segoe UI Regular", fontSize: SIZES.pr3, lineHeight: 26 },
};
