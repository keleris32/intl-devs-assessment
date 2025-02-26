import { Colors } from "@/constants/Colors";
import { View } from "react-native";

import { useColorScheme } from "@/hooks/useColorScheme";

export const TabBarBackground = () => {
  const colorScheme = useColorScheme();
  return (
    <View
      style={{
        backgroundColor: Colors[colorScheme ?? "light"].background,
        width: "100%",
        height: 90,
      }}
    />
  );
};
