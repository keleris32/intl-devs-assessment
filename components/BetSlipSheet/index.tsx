import React from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { LinearGradient } from "expo-linear-gradient";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useBottomSheet } from "@/context/BottomSheetContext";
import { CASH_ICON, RABBI } from "@/constants/Images";
import { useSwitch } from "@/context/SwitchContext";
import { useBet } from "@/context/BetContext";
import CustomText from "../CustomText";
import Switch from "../Switch";
import BetSlipItem from "./BetSlipItem";
import AlertBanner from "./AlertBanner";
import BetAmountSelector from "./BetAmountSelector";
import AppButton from "../AppButton";

interface IProps {
  snapPoints: string[];
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

const BestSlipSheet: React.FC<IProps> = ({ snapPoints, bottomSheetRef }) => {
  const [sheetTab, setSheetTab] = React.useState<string>("singles");
  const [bets, setBets] = React.useState(sampleBets);
  const [totalAmount, setTotalAmount] = React.useState(
    sampleBets.reduce((sum, bet) => sum + Number(bet.initialAmount), 0)
  );
  const [betAmount, setBetAmount] = React.useState<number | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [showCopyOption, setShowCopyOption] = React.useState<boolean>(false);

  const { selectedBets, clearBets } = useBet();
  const { isActive, toggleSwitch } = useSwitch();

  const handleBetAmountChange = (amount: number | null) => {
    setBetAmount(amount);
  };

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

  const colorScheme = useColorScheme();
  const { closeBottomSheet } = useBottomSheet();

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
    toggleSwitch(), setBetAmount(null);
    setShowCopyOption(false);
    setLoading(false);
  };

  const handleNoButton = () => {
    clearBets();
    bottomSheetRef?.current?.close();
    setShowCopyOption(false);
    setLoading(false);
    setBetAmount(null);
  };

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop
      {...props}
      opacity={0.5}
      appearsOnIndex={0}
      disappearsOnIndex={-1}
    />
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      index={-1}
      enablePanDownToClose
      backgroundStyle={[
        {},
        {
          backgroundColor: Colors[colorScheme ?? "light"].background,
          borderWidth: 1,
          borderColor: Colors[colorScheme ?? "light"].border,
        },
      ]}
      handleIndicatorStyle={{
        backgroundColor: Colors[colorScheme ?? "light"].text,
      }}
      onChange={(index) => {
        if (index === -1) {
          closeBottomSheet();
        }
      }}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView
        style={{
          flex: 1,
          paddingTop: 20,
        }}
      >
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 30,
            flexGrow: 1,
          }}
          showsVerticalScrollIndicator={false}
        >
          <CustomText style={styles.titleHeader}>
            BETSLIP ({selectedBets?.length})
          </CustomText>
          <View style={styles.tabContainer}>
            <Pressable
              style={[
                styles.tab,
                {
                  borderBottomWidth: sheetTab === "singles" ? 2 : 0,
                  borderBottomColor:
                    sheetTab === "singles"
                      ? Colors[colorScheme ?? "light"].text
                      : undefined,
                },
              ]}
              onPress={() => setSheetTab("singles")}
            >
              <CustomText style={styles.tabText}>Singles</CustomText>
            </Pressable>
            <Pressable
              style={[
                styles.tab,
                {
                  borderBottomWidth: sheetTab === "parlay" ? 2 : 0,
                  borderBottomColor:
                    sheetTab === "parlay"
                      ? Colors[colorScheme ?? "light"].text
                      : undefined,
                },
              ]}
              onPress={() => setSheetTab("parlay")}
            >
              <CustomText style={styles.tabText}>Parlay</CustomText>
            </Pressable>
          </View>
          <LinearGradient
            colors={[
              isActive ? "#15C54A40" : "#F02E95",
              isActive
                ? "rgba(21, 197, 74, 0.001)"
                : "rgba(240, 46, 149, 0.001)",
            ]}
            start={{ x: 0.2, y: 0 }}
            end={{ x: 0.2, y: 1 }}
            style={styles.gradientBackground}
          >
            <View style={styles.currencyContainer}>
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
              >
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
            onChange={handleBetAmountChange}
          />
          <View style={styles.buttonWrapper}>
            <AppButton
              label="You will earn 360XP with this bet"
              contentContainerStyle={{
                backgroundColor: "#44FFC41A",
              }}
              labelStyle={{
                fontSize: 16,
                fontFamily: "Inter",
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
                fontSize: 14,
                fontFamily: "JoyRide",
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
        </ScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
};

export default BestSlipSheet;

const styles = StyleSheet.create({
  titleHeader: {
    fontFamily: "JoyRide",
    fontSize: 20,
    fontWeight: 400,
    textAlign: "center",
  },
  tabContainer: {
    flexDirection: "row",
    marginTop: 30,
    height: 45,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 10,
  },
  tabText: {
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 500,
  },
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
    marginTop: 20,
    marginBottom: 20,
    gap: 15,
    paddingHorizontal: 15,
  },
  copyDescription: {
    fontFamily: "Inter",
    fontSize: 18,
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
    fontFamily: "JoyRide",
    fontSize: 14,
    fontWeight: 400,
  },
});
