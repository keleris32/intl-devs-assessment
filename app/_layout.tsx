import { SafeAreaView, StyleSheet, StatusBar } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { RelayEnvironmentProvider } from "react-relay/hooks";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { SwitchProvider } from "@/context/SwitchContext";
import { BetProvider } from "@/context/BetContext";
import { BottomSheetProvider } from "@/context/BottomSheetContext";
import RelayEnvironment from "@/relay/RelayEnvironment";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    JoyRide: require("../assets/fonts/Joyride.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <BottomSheetProvider>
          <SwitchProvider>
            <BetProvider>
              {/* @ts-ignore */}
              <RelayEnvironmentProvider environment={RelayEnvironment}>
                <SafeAreaView style={[styles.container]}>
                  <Stack>
                    <Stack.Screen
                      name="(tabs)"
                      options={{ headerShown: false }}
                    />
                    <Stack.Screen name="+not-found" />
                  </Stack>
                </SafeAreaView>
              </RelayEnvironmentProvider>
            </BetProvider>
          </SwitchProvider>
        </BottomSheetProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
});
