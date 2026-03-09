// PlayersScreen.tsx
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const positions = ["ALL", "PG", "SG", "SF", "PF", "C"];

export default function PlayersScreen() {
  const [players, setPlayers] = useState<any[]>([]);
  const [selectedPosition, setSelectedPosition] = useState("ALL");
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/jasneljuillet/cvu-moblie-app/refs/heads/main/data/players.json"
      );
      const data = await res.json();
      setPlayers(data);
    } catch (err) {
      console.error("Error fetching players:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredPlayers =
    selectedPosition === "ALL"
      ? players
      : players.filter((p) => p.position === selectedPosition);

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <LottieView
            source={require("./Basketball.json")}
            autoPlay
            loop
            style={{ width: 200, height: 200 }}
          />
          <Text style={styles.loadingText}>Loading players...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      {/* FILTER */}
      <View style={styles.filterRow}>
        {positions.map((pos) => (
          <Pressable
            key={pos}
            onPress={() => setSelectedPosition(pos)}
            style={[
              styles.filterButton,
              {
                backgroundColor: selectedPosition === pos ? "#5BF62F" : "#222",
              },
            ]}
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

      {/* LIST WITH PULL-TO-REFRESH */}
      <ScrollView
        contentContainerStyle={styles.grid}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              fetchData();
            }}
            tintColor="#5BF62F"
          />
        }
      >
        {filteredPlayers.map((player) => (
          <Pressable
            key={player.id}
            onPress={() => setSelectedPlayer(player)}
            style={styles.gridCard}
          >
            <Image source={{ uri: player.photo }} style={styles.gridImage} />
            <Text style={styles.gridName}>
              {player.firstName} {player.lastName}
            </Text>
            <Text style={styles.gridNumber}>
              {player.jerseyNumber} • {player.position}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      {/* MODAL */}
      <Modal
        visible={!!selectedPlayer}
        animationType="slide"
        transparent
        onRequestClose={() => setSelectedPlayer(null)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            {selectedPlayer && (
              <>
                <Image
                  source={{ uri: selectedPlayer.photo }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>
                  #{selectedPlayer.jerseyNumber} {selectedPlayer.firstName}{" "}
                  {selectedPlayer.lastName}
                </Text>
                <Text style={styles.modalText}>
                  Poste: {selectedPlayer.position}
                </Text>
                <Text style={styles.modalText}>
                  Weight: {selectedPlayer.weight} kg
                </Text>
                <Text style={styles.modalText}>
                  Height: {selectedPlayer.height} cm
                </Text>
                <Text style={styles.modalText}>
                  Date of birth: {selectedPlayer.birthDate}
                </Text>
                <Text style={styles.modalText}>
                  Contract until: {selectedPlayer.contractUntil}
                </Text>

                <Pressable
                  onPress={() => setSelectedPlayer(null)}
                  style={styles.closeButton}
                >
                  <Text style={styles.closeText}>Close</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "white" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#5BF62F",
    fontWeight: "600",
  },
  filterRow: {
    flexDirection: "row",
    marginTop: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  gridCard: {
    width: "48%",
    backgroundColor: "#111",
    borderRadius: 12,
    marginBottom: 16,
    overflow: "hidden",
    alignItems: "center",
  },
  gridImage: {
    width: "100%",
    height: 140,
  },
  gridName: {
    color: "#fff",
    fontWeight: "700",
    marginTop: 6,
  },
  gridNumber: {
    color: "#5BF62F",
    fontSize: 13,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  modal: {
    backgroundColor: "#111",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  modalImage: {
    width: "100%",
    height: 220,
    borderRadius: 16,
    marginBottom: 12,
  },
  modalTitle: { color: "#5BF62F", fontSize: 20, fontWeight: "700" },
  modalText: { color: "#aaa", marginTop: 4 },
  closeButton: {
    marginTop: 16,
    backgroundColor: "#5BF62F",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  closeText: { color: "#000", fontWeight: "700" },
});
