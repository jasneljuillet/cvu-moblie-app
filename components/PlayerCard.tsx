// PlayersScreen.tsx
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function PlayersScreen() {
  const [players, setPlayers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/jasneljuillet/cvu-moblie-app/refs/heads/main/data/players.json"
        );
        const data = await res.json();
        setPlayers(data);
      } catch (err) {
        console.error("Error fetching players:", err);
      }
    };
    fetchData();
  }, []);

  const renderPlayerCard = (player: any) => (
    <Pressable
      onPress={() => console.log("Clicked:", player)}
      style={styles.card}
    >
      {/* IMAGE */}
      <Image source={{ uri: player.photo }} style={styles.image} />

      {/* INFO */}
      <View style={styles.info}>
        <Text style={styles.name}>
          {player.firstName} {player.lastName}
        </Text>
        <Text style={styles.number}>
          #{player.jerseyNumber} • {player.position}
        </Text>
        <Text style={styles.text}>
          Height: {player.height} cm • Weight: {player.weight} kg
        </Text>
        <Text style={styles.text}>Contract until {player.contractUntil}</Text>
      </View>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={players}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => renderPlayerCard(item)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#000",
  },
  list: {
    padding: 16,
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
  number: {
    color: "#5BF62F",
    fontWeight: "700",
    fontSize: 14,
  },
  name: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },
  text: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },
});
