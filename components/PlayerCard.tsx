// PlayerCard.tsx
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Player } from "../data/Players";

type Props = {
  player: Player;
  onPress: () => void;
};

export function PlayerCard({ player, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      {/* IMAGE */}
      <Image source={player.photo} style={styles.image} />

      {/* INFO */}
      <View style={styles.info}>
        <Text style={styles.name}>
          {player.firstName} {player.lastName}
        </Text>
        <Text style={styles.number}>
          {player.jerseyNumber} {player.position}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#111",
    borderRadius: 16,
    marginBottom: 12,
    overflow: "hidden",
  },
  image: {
    flex: 0.4, // imaj pran 40% nan card la
    height: 150, // plis wotè pou vizyèl bèl
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  info: {
    flex: 0.6, // info pran 60% nan card la
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
