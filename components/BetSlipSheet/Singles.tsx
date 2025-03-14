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
import BottomSheet from "@gorhom/bottom-sheet";

import { FONTS } from "@/constants/Fonts";
import { useBet } from "@/context/BetContext";
import { useSwitch } from "@/context/SwitchContext";
import { CASH_ICON, RABBI } from "@/constants/Images";
import CustomText from "../CustomText";
import Switch from "../Switch";
import BetSlipItem from "./BetSlipItem";
import AlertBanner from "./AlertBanner";
import BetAmountSelector from "./BetAmountSelector";
import AppButton from "../AppButton";

interface IProps {
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const sampleBets = [
  {
    id: "1",
    team: "Warriors -3.5",
    match: "Warriors vs Bucks",
    odds: "-120",
    initialAmount: "$100",
    endTime: "8:00 PM",
    teamLogo: "https://images3.alphacoders.com/770/770791.jpg",
  },
  {
    id: "2",
    team: "Kings Moneyline",
    match: "Hornets vs Kings",
    odds: "+140",
    initialAmount: "$100",
    endTime: "8:00 PM",
    teamLogo:
      "https://cdn.nba.com/teams/uploads/sites/1610612759/2023/08/logo-2.jpg?im=AspectCrop=(3,4),xPosition=0.5,yPosition=0.5;Resize=(640)",
  },
];

const Singles: React.FC<IProps> = ({ bottomSheetRef }) => {
  const [bets, setBets] = React.useState(sampleBets);
  const [totalAmount, setTotalAmount] = React.useState(
    sampleBets.reduce((sum, bet) => sum + Number(bet.initialAmount), 0)
  );
  const [customAmount, setCustomAmount] = React.useState<string>("");
  const [betAmount, setBetAmount] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showCopyOption, setShowCopyOption] = React.useState<boolean>(false);

  const { selectedBets, clearBets } = useBet();
  const { isActive, toggleSwitch } = useSwitch();

  const handleAmountChange = (id: string, amount: number) => {
    setBets((prevBets) => {
      const updatedBets = prevBets.map((bet) =>
        bet.id === id ? { ...bet, initialAmount: String(amount) } : bet
      );

      const newTotalAmount = updatedBets.reduce(
        (sum, bet) => sum + Number(bet.initialAmount || 0),
        0
      );

      setTotalAmount(newTotalAmount);
      return updatedBets;
    });
  };

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
        {selectedBets?.map((item) => (
          <BetSlipItem
            key={item.game.id}
            {...item}
            onRemove={() =>
              setBets((prevBets) =>
                prevBets.filter((bet) => bet.id !== item.game.id)
              )
            }
            onAmountChange={(amount) =>
              handleAmountChange(item.game.id, amount)
            }
          />
        ))}
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

export default Singles;

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
    width: 30,
    height: 30,
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
