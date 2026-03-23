import GalleryGrid from "@/components/GalleryGrid";
import { Ionicons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { useLocalSearchParams, useRouter } from "expo-router";
import LottieView from "lottie-react-native"; // ✅ import Lottie
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export type MediaItem = {
  id: string;
  type: "image" | "video";
  source: string;
  height: number;
};

function randomHeight(min = 240, max = 340) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function GalleryDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [data, setData] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async (): Promise<MediaItem[]> => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/jasneljuillet/cvu-moblie-app/main/data/gallery.json"
      );
      const json = await res.json();
      return json.map((item: any) => ({
        ...item,
        height: randomHeight(),
      }));
    } catch (err) {
      console.error("Error fetching gallery:", err);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      const items = await fetchGallery();
      setData(items);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#000",
        }}
      >
        <LottieView
          source={require("../(tabs)/Basketball.json")} // ✅ mete chemen animasyon ou
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }

  const selected = data.find((i) => i.id === id);
  const others = data.filter((i) => i.id !== id);

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
          source={{ uri: selected.source }}
          style={{
            width,
            height: width * (4 / 3),
            borderRadius: 24,
          }}
          resizeMode="cover"
        />
      ) : (
        <Video
          source={{ uri: selected.source }}
          style={{
            width,
            height: width * (4 / 3),
            borderRadius: 24,
          }}
          resizeMode="cover"
          shouldPlay
          isLooping={true}
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
