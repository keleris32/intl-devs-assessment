import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";

import { FONTS } from "@/constants/Fonts";
import { useSwitch } from "@/context/SwitchContext";

type BetAmountType = {
  betAmount: number | null;
  customAmount: string;
  onChange: (amount: number | null) => void;
  onChangeCustom: (amount: string) => void;
};

const BetAmountSelector: React.FC<BetAmountType> = ({
  onChange,
  onChangeCustom,
  betAmount,
  customAmount,
}) => {
  const { isActive } = useSwitch();

  const predefinedAmounts = [50, 100, 200];

  const handleAmountPress = (amount: number) => {
    onChange(amount);
    onChangeCustom("");
  };

  const handleCustomAmountChange = (text: string) => {
    onChangeCustom(text);
    onChange(Number(text));
  };

  const getTotalBet = () =>
    betAmount ? betAmount : customAmount ? parseFloat(customAmount) || 0 : 0;

  return (
    <View style={styles.container}>
      <View style={styles.amountOptions}>
        {predefinedAmounts.map((amount) => (
          <TouchableOpacity
            key={amount}
            style={[
              styles.amountButton,
              betAmount === amount && [
                styles.selectedAmount,
                { backgroundColor: isActive ? "#15C249" : "#F02E95" },
              ],
            ]}
            onPress={() => handleAmountPress(amount)}
          >
            <Text style={styles.amountText}>${amount}</Text>
          </TouchableOpacity>
        ))}

        <TextInput
          style={[styles.customInput, customAmount && styles.selectedAmount]}
          placeholder="Custom"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={customAmount}
          onChangeText={handleCustomAmountChange}
        />
      </View>

      <View style={[styles.totalBetContainer, { marginTop: 20 }]}>
        <Text style={styles.totalBetText}>Total bet</Text>
        <Text style={styles.totalBetAmount}>${getTotalBet()}</Text>
      </View>
      <View style={styles.totalBetContainer}>
        <Text style={styles.totalBetText}>Potential win</Text>
        <Text
          style={[
            styles.totalBetAmount,
            { color: isActive ? "#15C249" : "#F02E95" },
          ]}
        >
          ${getTotalBet() === 0 ? 0 : getTotalBet() + 120}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    paddingHorizontal: 15,
  },
  amountOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  amountButton: {
    flex: 1,
    backgroundColor: "#333",
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
  },
  selectedAmount: {},
  amountText: {
    ...FONTS.ps3,
    color: "#fff",
    fontWeight: "bold",
  },
  customInput: {
    flex: 1,
    backgroundColor: "#333",
    color: "#fff",
    fontWeight: "bold",
    paddingVertical: 10,
    borderRadius: 6,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#444",
  },
  totalBetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  totalBetText: {
    color: "#aaa",
    ...FONTS.ps2,
  },
  totalBetAmount: {
    color: "#fff",
    ...FONTS.ps2,
    fontWeight: "bold",
  },
});

export default BetAmountSelector;
