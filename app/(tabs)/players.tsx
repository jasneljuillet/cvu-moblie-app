// PlayersScreen.tsx
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  Pressable,
  SafeAreaView,
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
            source={require("./Basketball.json")} // animasyon ou telechaje a
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

      {/* LIST */}
      <FlatList
        data={filteredPlayers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setSelectedPlayer(item)}
            style={styles.card}
          >
            <Image source={{ uri: item.photo }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.name}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={styles.number}>
                #{item.jerseyNumber} • {item.position}
              </Text>
            </View>
          </Pressable>
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
    justifyContent: "center", // mitan vètikal
    alignItems: "center", // mitan orizontal
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
  card: {
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
  },
  image: {
    flex: 0.4,
    height: 150,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  info: {
    flex: 0.6,
    padding: 12,
    justifyContent: "center",
  },
  number: { color: "#5BF62F", fontWeight: "700", fontSize: 14 },
  name: { color: "#fff", fontSize: 16, fontWeight: "600", marginTop: 2 },
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
