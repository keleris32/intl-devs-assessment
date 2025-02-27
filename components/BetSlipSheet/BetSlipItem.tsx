import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useBet } from "@/context/BetContext";
import CustomText from "../CustomText";
import { FONTS } from "@/constants/Fonts";

interface BetSlipItemProps {
  selectedTeam: any;
  game: any;
  odds: string;
  initialAmount?: string;
  onRemove: () => void;
  onAmountChange: (amount: number) => void;
}

const BetSlipItem: React.FC<BetSlipItemProps> = ({
  selectedTeam,
  game,
  odds,
  initialAmount = "",
  onRemove,
  onAmountChange,
}) => {
  const [amount, setAmount] = React.useState(initialAmount);

  const { removeBet } = useBet();

  const handleAmountChange = (value: string) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    setAmount(numericValue);
    onAmountChange(Number(numericValue));
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => removeBet(game.id)}
        style={styles.deleteButton}
      >
        <Ionicons name="trash-outline" size={20} color="#B0B0B0" />
      </TouchableOpacity>

      <View style={styles.content}>
        <View style={styles.matchRow}>
          <CustomText
            style={styles.matchText}
          >{`${game.team1.name} VS ${game.team2.name}`}</CustomText>
          <CustomText style={styles.endTime}>
            Ends at {new Date(Number(game.endTime)).toLocaleTimeString()} EST
          </CustomText>
        </View>

        <View style={styles.teamRow}>
          <Image source={{ uri: selectedTeam.logo }} style={styles.teamLogo} />
          <CustomText style={styles.teamText}>{selectedTeam.name}</CustomText>
        </View>

        <View style={styles.bottomRow}>
          <CustomText style={styles.odds}>{odds}</CustomText>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={handleAmountChange}
            keyboardType="numeric"
            placeholder="$0"
            placeholderTextColor="#ffffff"
          />
        </View>
      </View>
    </View>
  );
};

export default BetSlipItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF1A",
    borderRadius: 8,
    marginVertical: 5,
    alignItems: "center",
    paddingRight: 12,
    gap: 10,
    height: 120,
  },
  deleteButton: {
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: "#FFFFFF33",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  content: {
    flex: 1,
    flexDirection: "column",
    paddingLeft: 10,
  },
  matchRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  matchText: {
    color: "#FFFFFF",
    ...FONTS.ps2,
    fontWeight: "600",
  },
  endTime: {
    color: "#B0B0B0",
    ...FONTS.ps3,
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  teamLogo: {
    width: 20,
    height: 20,
    marginRight: 6,
  },
  teamText: {
    color: "#FFFFFF",
    ...FONTS.ps2,
    fontWeight: "700",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingBottom: 15,
  },
  odds: {
    color: "#FFFFFF",
    ...FONTS.ps3,
    fontWeight: "600",
  },
  amount: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  amountInput: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
    minWidth: 80,
    textAlign: "right",
    backgroundColor: "#FFFFFF1A",
    padding: 8,
    borderRadius: 5,
  },
});
