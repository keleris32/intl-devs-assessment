import React from "react";
import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useBottomSheet } from "@/context/BottomSheetContext";
import { useBet } from "@/context/BetContext";
import CustomText from "../CustomText";
import Singles from "./Singles";
import Parlay from "./Parlay";

interface IProps {
  snapPoints: string[];
  bottomSheetRef: React.RefObject<BottomSheet>;
}

const BestSlipSheet: React.FC<IProps> = ({ snapPoints, bottomSheetRef }) => {
  const [sheetTab, setSheetTab] = React.useState<string>("singles");

  const { selectedBets } = useBet();
  const { closeBottomSheet } = useBottomSheet();
  const colorScheme = useColorScheme();

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
      enableContentPanningGesture={true}
      enableHandlePanningGesture={true}
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
          nestedScrollEnabled={true}
          style={{ flex: 1 }}
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
          {sheetTab === "singles" ? (
            <Singles bottomSheetRef={bottomSheetRef} />
          ) : (
            <Parlay bottomSheetRef={bottomSheetRef} />
          )}
        </ScrollView>
        {/* <FlatList
          style={{ flex: 1 }}
          data={[]}
          renderItem={null}
          pointerEvents="box-none"
          ListHeaderComponent={
            <>
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
            </>
          }
          ListFooterComponent={
            sheetTab === "singles" ? (
              <Singles bottomSheetRef={bottomSheetRef} />
            ) : (
              <Parlay bottomSheetRef={bottomSheetRef} />
            )
          }
          contentContainerStyle={{
            flexGrow: 1,
            paddingBottom: 30,
          }}
          showsVerticalScrollIndicator={false}
        /> */}
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
});
