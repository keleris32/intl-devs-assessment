import React from "react";
import {
  Animated,
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import BottomSheet from "@gorhom/bottom-sheet";

import { Screen } from "@/components/Screen";
import {
  CASH_ICON,
  NBA,
  BASKETBALL,
  TENNIS,
  FOOTBALL,
  RABBI,
} from "@/constants/Images";
import { useBet } from "@/context/BetContext";
import { FONTS } from "@/constants/Fonts";
import { useSwitch } from "@/context/SwitchContext";
import { useBottomSheet } from "@/context/BottomSheetContext";
import ScreenHeader from "@/components/ScreenHeader";
import Switch from "@/components/Switch";
import CustomText from "@/components/CustomText";
import SearchComponent from "@/components/SearchComponent";
import GameList from "@/components/GameList";
import AppButton from "@/components/AppButton";
import BetSlipSheet from "@/components/BetSlipSheet";

const sportsData = [
  { id: "1", name: "NBA", icon: NBA },
  { id: "2", name: "CBB (M)", icon: BASKETBALL },
  { id: "3", name: "OPEN (M)", icon: TENNIS },
  { id: "4", name: "CFB", icon: FOOTBALL },
  { id: "5", name: "CBB (M)", icon: BASKETBALL },
  { id: "6", name: "AUS (M)", icon: TENNIS },
];

export default function HomeScreen() {
  const [isFlashing, setIsFlashing] = React.useState(true);
  const [opacity] = React.useState(new Animated.Value(1));

  const betSlipBottomSheetRef = React.useRef<BottomSheet>(null);
  const { openBottomSheet } = useBottomSheet();
  const { selectedBets } = useBet();
  const { isActive } = useSwitch();

  const handleSearch = (query: string) => {
    console.log("Search Query:", query);
  };

  const SportCategoryItem = ({ name, icon }: { name: string; icon: any }) => (
    <View style={styles.categoryItem}>
      <Image source={icon} style={styles.icon} resizeMode="contain" />
      <CustomText style={styles.categoryText}>{name}</CustomText>
    </View>
  );

  React.useEffect(() => {
    if (isFlashing) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, {
            toValue: 0,
            duration: 600,
            useNativeDriver: true,
          }),
          Animated.timing(opacity, {
            toValue: 1,
            duration: 600,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      opacity.setValue(1);
    }
  }, [isFlashing]);

  return (
    <Screen>
      <ScrollView
        style={{ flex: 1, marginBottom: 50 }}
        showsVerticalScrollIndicator={false}
      >
        <ScreenHeader />
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
        <View style={{ padding: 15 }}>
          <SearchComponent placeholder="Search..." onSearch={handleSearch} />
        </View>
        <FlatList
          data={sportsData}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SportCategoryItem name={item.name} icon={item.icon} />
          )}
          contentContainerStyle={styles.listContainer}
          style={{ flexGrow: 0 }}
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 15,
            marginVertical: 20,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Animated.View style={[styles.indicator, { opacity }]}>
              {isFlashing ? (
                <View style={styles.redCircle} />
              ) : (
                <View style={styles.greenCircle} />
              )}
            </Animated.View>
            <CustomText style={styles.sectionTitle}>Live sports</CustomText>
          </View>
          <Pressable>
            <CustomText style={styles.seeAll}>View all</CustomText>
          </Pressable>
        </View>
        <View style={{ paddingHorizontal: 15, gap: 30, paddingBottom: 70 }}>
          <GameList />
          <AppButton
            label={`OPEN BET SLIP (${selectedBets?.length})`}
            contentContainerStyle={{
              backgroundColor: "#FFE100",
            }}
            labelStyle={{
              ...FONTS.l3,
              color: "#53470C",
            }}
            onPress={() => {
              betSlipBottomSheetRef?.current?.expand(), openBottomSheet();
            }}
          />
        </View>
      </ScrollView>
      <BetSlipSheet
        snapPoints={["70%"]}
        bottomSheetRef={betSlipBottomSheetRef}
      />
    </Screen>
  );
}

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
    ...FONTS.h3,
    fontWeight: 400,
  },
  listContainer: {
    paddingVertical: 10,
  },
  categoryItem: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    paddingHorizontal: 5,
  },
  icon: {
    width: wp("10"),
    height: wp("10"),
    borderRadius: 25,
    backgroundColor: "#333",
    padding: 10,
  },
  categoryText: {
    color: "#FFF",
    ...FONTS.ps3,
    marginTop: 5,
  },
  indicator: {
    width: 12,
    height: 12,
    marginTop: 3,
    marginLeft: 5,
  },
  greenCircle: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#42B245",
  },
  redCircle: {
    width: 10,
    height: 10,
    borderRadius: 6,
    backgroundColor: "#EC232A",
  },
  sectionTitle: {
    ...FONTS.ps2,
    fontWeight: 600,
  },
  seeAll: {
    ...FONTS.ps2,
  },
});
