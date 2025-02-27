import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Bell, CircleUser, Wallet } from "lucide-react-native";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { FONTS } from "@/constants/Fonts";
import CustomText from "./CustomText";

const ScreenHeader = () => {
  const colorScheme = useColorScheme();
  return (
    <View style={styles.container}>
      <CustomText style={styles.screenHeader}>SPORTS</CustomText>
      <View style={styles.iconWrapper}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.iconContainer,
            {
              backgroundColor: Colors[colorScheme ?? "light"].card,
            },
          ]}
        >
          <Bell size={20} color={Colors[colorScheme ?? "light"].text} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.iconContainer,
            {
              backgroundColor: Colors[colorScheme ?? "light"].card,
            },
          ]}
        >
          <Wallet size={20} color={Colors[colorScheme ?? "light"].text} />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={[
            styles.iconContainer,
            {
              backgroundColor: Colors[colorScheme ?? "light"].card,
            },
          ]}
        >
          <CircleUser size={20} color={Colors[colorScheme ?? "light"].text} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScreenHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 16,
  },
  screenHeader: {
    ...FONTS.h2,
    fontWeight: 400,
  },
  iconWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 6,
  },
});
