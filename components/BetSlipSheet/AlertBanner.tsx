import React from "react";
import { View, StyleSheet, Text } from "react-native";

const AlertBanner = ({ message }: { message: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE1001A",
    padding: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FFE100",
    borderStyle: "dashed",
    marginHorizontal: 15,
  },
  text: {
    fontFamily: "Inter",
    color: "#FFE100",
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "600",
    textAlign: "left",
  },
});

export default AlertBanner;
