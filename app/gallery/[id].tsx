import GalleryGrid from "@/components/GalleryGrid";
import { galleryData, MediaItem } from "@/data/gallery";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av"; // ✅ IMPORT VIDEO
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";

const { width } = Dimensions.get("window");

export default function GalleryDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const selected = galleryData.find((i) => i.id === id);
  const others = galleryData.filter((i) => i.id !== id);

  if (!selected) return null;

  return (
    <ScrollView style={{ backgroundColor: "#000" }}>
      {/* Back */}
      <Pressable style={styles.button} onPress={() => router.back()}>
        <Ionicons name="arrow-back" size={20} color="white" />
        <Text style={styles.text}>Back</Text>
      </Pressable>

      {/* Main content */}
      {selected.type === "image" ? (
        <Image
          source={selected.source}
          style={{
            width,
            height: width * (4 / 3),
            borderRadius: 24,
          }}
          resizeMode="cover"
        />
      ) : (
        <Video
          source={selected.source}
          style={{
            width,
            height: width * (4 / 3),
            borderRadius: 24,
          }}
          resizeMode="cover"
          shouldPlay
          isLooping
          useNativeControls
        />
      )}

      {/* Others below */}
      <GalleryGrid
        data={others}
        onPress={(item: MediaItem) =>
          router.replace({
            pathname: "/gallery/[id]",
            params: { id: item.id },
          })
        }
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    color: "white",
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "500",
  },
  button: {
    flexDirection: "row",
    paddingHorizontal: 12,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0,0,0,0.65)",
    alignItems: "center",
    position: "absolute",
    top: 50,
    left: 16,
    zIndex: 20,
  },
});
