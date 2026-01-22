// PlayersScreen.js
import { PlayerCard } from "@/components/PlayerCard";
import { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from "react-native";
import { Player, players } from "../../data/Players";

const positions = ["ALL", "PG", "SG", "SF", "PF", "C"];

export default function PlayersScreen() {
  const [selectedPosition, setSelectedPosition] = useState("ALL");
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);

  const filteredPlayers =
    selectedPosition === "ALL"
      ? players
      : players.filter((p) => p.position === selectedPosition);

  return (
    <SafeAreaView
      style={{ flex: 1, paddingHorizontal: 16, backgroundColor: "white" }}
    >
      {/* FILTER */}
      <View style={{ flexDirection: "row", marginTop: 12, marginBottom: 16 }}>
        {positions.map((pos) => (
          <Pressable
            key={pos}
            onPress={() => setSelectedPosition(pos)}
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: 20,
              marginRight: 8,
              backgroundColor: selectedPosition === pos ? "#5BF62F" : "#222",
            }}
          >
            <Text
              style={{
                color: selectedPosition === pos ? "#000" : "#aaa",
                fontWeight: "600",
              }}
            >
              {pos}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <PlayerCard player={item} onPress={() => setSelectedPlayer(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
      />

      {/* MODAL */}
      <Modal
        visible={!!selectedPlayer}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedPlayer(null)}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.6)",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              backgroundColor: "#111",
              borderTopLeftRadius: 24,
              borderTopRightRadius: 24,
              padding: 20,
            }}
          >
            {selectedPlayer && (
              <>
                <Image
                  source={selectedPlayer.photo}
                  style={{
                    width: "100%",
                    height: 220,
                    borderRadius: 16,
                    marginBottom: 12,
                  }}
                />

                <Text
                  style={{
                    color: "#5BF62F",
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  #{selectedPlayer.jerseyNumber} {selectedPlayer.firstName}{" "}
                  {selectedPlayer.lastName}
                </Text>
                <Text style={{ color: "#aaa" }}>
                  Poste: {selectedPlayer.position}
                </Text>
                <Text style={{ color: "#aaa" }}>
                  weight: {selectedPlayer.weight} kg
                </Text>
                <Text style={{ color: "#aaa" }}>
                  height: {selectedPlayer.height} cm
                </Text>
                <Text style={{ color: "#aaa" }}>
                  Date of birth: {selectedPlayer.birthDate}
                </Text>
                <Text style={{ color: "#aaa" }}>
                  Contract until: {selectedPlayer.contractUntil}
                </Text>

                <Pressable
                  onPress={() => setSelectedPlayer(null)}
                  style={{
                    marginTop: 16,
                    backgroundColor: "#5BF62F",
                    padding: 12,
                    borderRadius: 14,
                    alignItems: "center",
                  }}
                >
                  <Text style={{ color: "#000", fontWeight: "700" }}>
                    Closed
                  </Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
