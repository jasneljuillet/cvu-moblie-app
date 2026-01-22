import { Match, calendarData } from "@/data/saeson2026";
import { useState } from "react";
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

const CVULogo = require("../../assets/images/cvu-official.png");

export default function CalendarScreen() {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        {/* ===== HEADER ===== */}
        <View style={styles.header}>
          <Text style={styles.title}>Official Schedule – Season 2026</Text>

          <Text style={styles.subtitle}>
            Follow all CVU games from the regular season to the playoffs.
          </Text>

          <View style={styles.legend}>
            <Text style={styles.legendText}>🟢 Upcoming match</Text>
            <Text style={styles.legendText}>⭐ Best Player</Text>
            <Text style={styles.legendText}>🏟️ Venue</Text>
          </View>
        </View>

        {/* ===== MATCH LIST ===== */}
        <FlatList
          data={calendarData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pressable onPress={() => setSelectedMatch(item)}>
              <View style={styles.card}>
                <View style={styles.teams}>
                  <Image source={CVULogo} style={styles.logo} />
                  <Text style={styles.vs}>VS</Text>
                  <Image
                    source={{ uri: item.opponent.logo }}
                    style={styles.logo}
                  />
                </View>

                <Text style={styles.teamNames}>
                  CVU vs {item.opponent.name}
                </Text>

                <Text style={styles.score}>{item.score}</Text>

                {item.bestPlayer && (
                  <View style={styles.bestPlayer}>
                    <Image
                      source={item.bestPlayer.photo}
                      style={styles.playerImage}
                    />
                    <View>
                      <Text style={styles.playerName}>
                        ⭐ {item.bestPlayer.name}
                      </Text>
                      <Text style={styles.playerStats}>
                        {item.bestPlayer.points} pts • {item.bestPlayer.assists}{" "}
                        ast • {item.bestPlayer.rebounds} reb •{" "}
                        {item.bestPlayer.blocks} blk
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </Pressable>
          )}
        />

        {/* ===== FOOTER ===== */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Scores will be updated after each game.
          </Text>
          <Text style={styles.motivation}>Go CVU 🔥 Every game matters.</Text>
        </View>

        {/* ===== MODAL ===== */}
        <Modal transparent visible={!!selectedMatch} animationType="fade">
          <View style={styles.overlay}>
            <View style={styles.modal}>
              {selectedMatch && (
                <>
                  <Text style={styles.modalTitle}>
                    CVU vs {selectedMatch.opponent.name}
                  </Text>
                  <Text style={styles.modalText}>📅 {selectedMatch.date}</Text>
                  <Text style={styles.modalText}>
                    🏟️ {selectedMatch.stadium}
                  </Text>

                  <Pressable
                    style={styles.close}
                    onPress={() => setSelectedMatch(null)}
                  >
                    <Text style={styles.closeText}>Close</Text>
                  </Pressable>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
  },

  /* HEADER */
  header: {
    paddingHorizontal: 20,
    paddingTop: 28, // 🔥 plus d’espace en haut
    paddingBottom: 16,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 22, // ⬆️ plus grand
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.3,
  },
  subtitle: {
    color: "#bbb",
    fontSize: 15, // ⬆️
    textAlign: "center",
    marginTop: 10,
    lineHeight: 20,
  },
  legend: {
    flexDirection: "row",
    marginTop: 14,
    gap: 14,
  },
  legendText: {
    color: "#9a9a9a",
    fontSize: 13, // ⬆️ symbol + text
  },

  /* LIST */
  list: {
    paddingHorizontal: 16,
    paddingTop: 6,
    paddingBottom: 26,
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
  },
  teams: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 46,
    height: 46,
    borderRadius: 23,
  },
  vs: {
    color: "#5BF62F",
    marginHorizontal: 12,
    fontWeight: "800",
    fontSize: 14,
  },
  teamNames: {
    color: "#fff",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "700",
    fontSize: 15,
  },
  score: {
    color: "#5BF62F",
    textAlign: "center",
    marginTop: 6,
    fontSize: 18,
    fontWeight: "800",
  },

  bestPlayer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    backgroundColor: "#1a1a1a",
    padding: 10,
    borderRadius: 14,
  },
  playerImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  playerName: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  playerStats: {
    color: "#aaa",
    fontSize: 13,
    marginTop: 2,
  },

  /* FOOTER */
  footer: {
    paddingVertical: 18,
    alignItems: "center",
  },
  footerText: {
    color: "#888",
    fontSize: 12,
    marginBottom: 6,
  },
  motivation: {
    color: "#5BF62F",
    fontSize: 14,
    fontWeight: "700",
  },

  /* MODAL */
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#111",
    padding: 22,
    borderRadius: 22,
    width: "82%",
  },
  modalTitle: {
    color: "#5BF62F",
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 14,
    textAlign: "center",
  },
  modalText: {
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 15,
  },
  close: {
    marginTop: 18,
    backgroundColor: "#5BF62F",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  closeText: {
    fontWeight: "800",
    fontSize: 14,
  },
});
