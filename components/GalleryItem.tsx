import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { Image, Pressable, StyleSheet, View } from "react-native";

export default function GalleryItem({ item, onPress }) {
  const height = item.height ?? (Math.random() > 0.5 ? 220 : 320);

  return (
    <Pressable onPress={() => onPress(item)} style={[styles.card, { height }]}>
      {item.type === "image" ? (
        <Image source={item.source} style={styles.media} resizeMode="cover" />
      ) : (
        <>
          {/* <Text>Video</Text> */}
          <Video
            source={item.source}
            style={styles.media}
            resizeMode="cover"
            isMuted
            shouldPlay={false}
          />
          {/* 🔹 Play badge */}
          <View style={styles.playBadge}>
            <Ionicons name="play" size={36} color="#fff" />
          </View>
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 6,
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#111",
  },
  media: {
    width: "100%",
    height: "100%",
  },
  playBadge: {
    position: "absolute",
    top: "45%",
    left: "45%",
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 40,
    padding: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
