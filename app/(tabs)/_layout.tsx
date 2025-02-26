import React from "react";
import { Tabs } from "expo-router";
import { Globe, Gem, ListChecks } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome6 } from "@expo/vector-icons";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { TabBarBackground } from "@/components/ui/TabBarBackground";
import { useBottomSheet } from "@/context/BottomSheetContext";
import { useSwitch } from "@/context/SwitchContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const { isBottomSheetOpen } = useBottomSheet();

  const CustomTabButton = ({ accessibilityState, children, onPress }: any) => {
    const { isActive } = useSwitch();
    const focused = accessibilityState.selected;

    return (
      <TouchableOpacity onPress={onPress} style={[styles.tabButton]}>
        {focused && (
          <LinearGradient
            colors={[
              isActive ? "#15C54A40" : "#F02E95",
              isActive
                ? "rgba(21, 197, 74, 0.001)"
                : "rgba(240, 46, 149, 0.001)",
            ]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={styles.gradientBackground}
          />
        )}
        <View
          style={[
            focused
              ? [
                  styles.focusedTab,
                  { borderTopColor: isActive ? "#15C54A40" : "#F02E95" },
                ]
              : styles.defaultTab,
          ]}
        >
          {children}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "dark"].tint,
          headerShown: false,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            backgroundColor: "#101216",
            position: "absolute",
            height: 90,
            paddingBottom: 20,
            display: isBottomSheetOpen ? "none" : "flex",
          },
          tabBarLabelStyle: {
            paddingBottom: 0,
            fontSize: 13,
            fontWeight: "600",
            fontFamily: "Inter",
          },
          tabBarButton: (props) => <CustomTabButton {...props} />,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Sports",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 size={20} name="football" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="featured"
          options={{
            title: "Featured",
            tabBarIcon: ({ color }) => (
              <FontAwesome6 size={20} name="medal" color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="bets"
          options={{
            title: "My bets",
            tabBarIcon: ({ color }) => <ListChecks size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="social"
          options={{
            title: "Social",
            tabBarIcon: ({ color }) => <Globe size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="reward"
          options={{
            title: "Reward",
            tabBarIcon: ({ color }) => <Gem size={20} color={color} />,
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  defaultTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderTopWidth: 0,
    borderTopColor: "transparent",
    width: 100,
  },
  focusedTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    borderTopWidth: 3,
    width: 90,
  },
  iconsStyle: {
    width: 20,
    height: 20,
  },

  gradientBackground: {
    position: "absolute",
    width: 88,
    height: 40,
    opacity: 0.2,
    top: 0,
  },
});
