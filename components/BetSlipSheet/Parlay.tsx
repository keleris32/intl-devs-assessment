import React from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import BottomSheet from "@gorhom/bottom-sheet";

import { FONTS } from "@/constants/Fonts";
import { useBet } from "@/context/BetContext";
import { useSwitch } from "@/context/SwitchContext";
import { CASH_ICON, RABBI } from "@/constants/Images";
import CustomText from "../CustomText";
import Switch from "../Switch";
import AlertBanner from "./AlertBanner";
import AppButton from "../AppButton";
import BetAmountSelector from "./BetAmountSelector";
import ParlaySlipItems from "./ParlaySlipItems";

interface IProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const Parlay: React.FC<IProps> = ({ bottomSheetRef }) => {
  const [customAmount, setCustomAmount] = React.useState<string>("");
  const [betAmount, setBetAmount] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showCopyOption, setShowCopyOption] = React.useState<boolean>(false);

  const { isActive, toggleSwitch } = useSwitch();
  const { selectedBets, clearBets } = useBet();

  const handleCustomAmountChange = (amount: string) => {
    setCustomAmount(amount);
  };
  const handleBetAmountChange = (amount: number | null) => {
    setBetAmount(amount);
  };

  const handleSlipSubmit = () => {
    if (selectedBets?.length === 0) {
      Alert.alert("You need to select a bet to continue");
      return;
    }

    if (selectedBets?.length > 0 && betAmount === null) {
      Alert.alert("Kindly indicate your bet amount for this slip to continue");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowCopyOption(true);
    }, 3000);
  };

  const handleYesButton = () => {
    toggleSwitch();
    setCustomAmount("");
    setBetAmount(null);
    setShowCopyOption(false);
    setLoading(false);
  };

  const handleNoButton = () => {
    clearBets();
    bottomSheetRef?.current?.close();
    setShowCopyOption(false);
    setLoading(false);
    setBetAmount(null);
    setCustomAmount("");
  };

  return (
    <React.Fragment>
      <LinearGradient
        colors={[
          isActive ? "#15C54A40" : "#F02E95",
          isActive ? "rgba(21, 197, 74, 0.001)" : "rgba(240, 46, 149, 0.001)",
        ]}
        start={{ x: 0.2, y: 0 }}
        end={{ x: 0.2, y: 1 }}
        style={styles.gradientBackground}
      >
        <View style={styles.currencyContainer}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Image
              style={styles.image}
              source={isActive ? CASH_ICON : RABBI}
              resizeMode="contain"
            />
            <CustomText style={styles.price}>
              {isActive ? "$23,927.00" : "12,000,000"}
            </CustomText>
          </View>

          <Switch activeColor={"#15C54A"} inActiveColor={"#F02E95"} />
        </View>
      </LinearGradient>
      <View style={{ marginVertical: 15, paddingHorizontal: 15 }}>
        {selectedBets?.length > 0 && <ParlaySlipItems />}
      </View>
      <AlertBanner message="One or more prices may have changed. Check and accept the changes for your selections." />

      <BetAmountSelector
        betAmount={betAmount}
        customAmount={customAmount}
        onChange={handleBetAmountChange}
        onChangeCustom={handleCustomAmountChange}
      />
      <View style={styles.buttonWrapper}>
        <AppButton
          label="You will earn 360XP with this bet"
          contentContainerStyle={{
            backgroundColor: "#44FFC41A",
          }}
          labelStyle={{
            ...FONTS.ps2,
            color: "#00FFF2",
          }}
          onPress={() => {}}
        />
        <AppButton
          label={
            loading && !showCopyOption
              ? "CONFIRMING"
              : !loading && showCopyOption
              ? "CONFIRMED"
              : "CONFIRM BET"
          }
          contentContainerStyle={{
            backgroundColor: "#FFE100",
          }}
          labelStyle={{
            ...FONTS.l3,
            color: "#53470C",
          }}
          onPress={handleSlipSubmit}
          loading={loading}
        />
      </View>
      {!loading && showCopyOption && (
        <View style={styles.copyContainer}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.copyDescription}>
              Would you like to copy this bet for{" "}
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={styles.image}
                source={!isActive ? CASH_ICON : RABBI}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.copyDescription,
                  { color: isActive ? "#F02E95" : "#15C54A" },
                ]}
              >
                {" "}
                {!isActive ? "Cash" : "Coin"}?
              </Text>
            </View>
          </View>
          <View style={styles.copyBtnWrapper}>
            <TouchableOpacity
              style={[
                styles.copyBtn,
                {
                  backgroundColor: "#282A2E",
                },
              ]}
              activeOpacity={0.8}
              onPress={handleNoButton}
            >
              <CustomText style={styles.copyBtnText}>NO</CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.copyBtn,
                {
                  backgroundColor: isActive ? "#F02E95" : "#15C54A",
                },
              ]}
              activeOpacity={0.8}
              onPress={handleYesButton}
            >
              <CustomText style={styles.copyBtnText}>YES</CustomText>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </React.Fragment>
  );
};

export default Parlay;

const styles = StyleSheet.create({
  gradientBackground: {
    padding: 15,
  },
  currencyContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: wp("8"),
    height: wp("8"),
  },
  price: {
    fontFamily: "JoyRide",
    fontSize: 24,
    fontWeight: 400,
  },
  buttonWrapper: { marginTop: 15, gap: 15, paddingHorizontal: 15 },
  copyContainer: {
    flexDirection: "column",
    flex: 1,
    marginTop: 20,
    marginBottom: 20,
    gap: 15,
    paddingHorizontal: 15,
  },
  copyDescription: {
    ...FONTS.ps2,
    fontWeight: 500,
    color: "#FFFFFF",
  },
  copyBtnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  copyBtn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    borderRadius: 4,
  },
  copyBtnText: {
    ...FONTS.l3,
    fontWeight: 400,
  },
});
