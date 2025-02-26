import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useLazyLoadQuery } from "react-relay";

import { useColorScheme } from "@/hooks/useColorScheme";
import { Colors } from "@/constants/Colors";
import { useBet } from "@/context/BetContext";
import GamesQuery from "../__generated__/GamesQuery.graphql";

interface Team {
  name: string;
  logo: string;
}

interface Game {
  id: string;
  team1: Team;
  team2: Team;
  moneyline1: string;
  moneyline2: string;
  spread1: string;
  spread2: string;
  totalOver: string;
  totalUnder: string;
  endTime: string;
}

const GameCard: React.FC<{ game: any }> = ({ game }) => {
  const colorScheme = useColorScheme();
  const { addBet, selectedBets } = useBet();

  const isSelected = (odds: string, oddType: string) =>
    selectedBets.some(
      (bet) =>
        bet.game.id === game.id && bet.odds === odds && bet.oddType === oddType
    );

  const addSelectedTeam = (data: any) => {
    addBet(data);
  };

  return (
    <View
      style={[
        styles.card,
        { borderBottomColor: Colors[colorScheme ?? "dark"].border },
      ]}
    >
      {/* Team 1 */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <View style={styles.teamRow}>
          <Image
            source={{ uri: game.team1.logo }}
            style={styles.logo}
            resizeMode="cover"
          />
          <Text style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">
            {game.team1.name}
          </Text>
        </View>
        <View style={styles.oddsRow}>
          {["moneyline1", "spread1", "totalOver"].map((oddType, index) => {
            const odds = game[oddType];

            console.log(odds, "OKAY ODDS");
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={[
                  [
                    styles.oddsButton,
                    { borderColor: Colors[colorScheme ?? "dark"].border },
                  ],
                  isSelected(odds, oddType) && {
                    backgroundColor: "#FFE1001A",
                    borderColor: "#FFE100",
                    borderWidth: 2,
                  },
                ]}
                onPress={() =>
                  addSelectedTeam({
                    game: game,
                    odds: odds,
                    selectedTeam: {
                      name: game.team1.name,
                      logo: game.team1.logo,
                    },
                    oddType,
                  })
                }
              >
                <Text
                  style={[
                    styles.oddsText,
                    {
                      color: Colors[colorScheme ?? "dark"].text,
                    },
                  ]}
                >
                  {odds}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Team 2 */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
        <View style={styles.teamRow}>
          <Image
            source={{ uri: game.team2.logo }}
            style={styles.logo}
            resizeMode="cover"
          />
          <Text style={styles.teamName} numberOfLines={1} ellipsizeMode="tail">
            {game.team2.name}
          </Text>
        </View>
        <View style={styles.oddsRow}>
          {["moneyline2", "spread2", "totalUnder"].map((oddType, index) => {
            const odds = game[oddType];
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={[
                  [
                    styles.oddsButton,
                    { borderColor: Colors[colorScheme ?? "dark"].border },
                  ],
                  isSelected(odds, oddType) && {
                    backgroundColor: "#FFE1001A",
                    borderColor: "#FFE100",
                    borderWidth: 2,
                  },
                ]}
                onPress={() =>
                  addSelectedTeam({
                    game: game,
                    odds: odds,
                    selectedTeam: {
                      name: game.team2.name,
                      logo: game.team2.logo,
                    },
                    oddType,
                  })
                }
              >
                <Text
                  style={[
                    styles.oddsText,
                    {
                      color: Colors[colorScheme ?? "dark"].text,
                    },
                  ]}
                >
                  {odds}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const GameList: React.FC = () => {
  const data: any = useLazyLoadQuery(GamesQuery, {});

  return (
    <FlatList
      data={data.games}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <GameCard game={item} />}
      contentContainerStyle={styles.listContainer}
      style={{ backgroundColor: "#1B1E23", borderRadius: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {},
  card: {
    flexDirection: "column",
    backgroundColor: "#1c1e21",
    borderRadius: 10,
    marginBottom: 16,
    gap: 20,
    padding: 15,
    paddingBottom: 25,
    borderBottomWidth: 1,
  },
  teamRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 0.6,
    height: "100%",
    backgroundColor: "#30353D",
    borderRadius: 6,
    gap: 10,
  },
  logo: {
    width: 32,
    height: 60,
    marginRight: 8,
  },
  teamName: {
    color: "#fff",
    fontSize: 16,
    flex: 1,
  },
  vs: {
    color: "#aaa",
    textAlign: "center",
    marginVertical: 4,
  },
  oddsButton: {
    flex: 1,
    padding: 8,
    paddingVertical: 20,
    borderRadius: 4,
    borderWidth: 1,
    alignItems: "center",
  },
  oddsRow: {
    flexDirection: "row",
    gap: 10,
    flex: 1,
  },
  oddsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  odds: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    borderWidth: 1,
    paddingVertical: 20,
    borderRadius: 6,
    flex: 1,
  },
  endTime: {
    color: "#aaa",
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },
});

export default GameList;
