import MasonryGallery from "@/components/MasonryGallery";
import { randomHeight } from "@/utils/randomHeight";
import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { View } from "react-native";

export type MediaItem = {
  id: string;
  type: "image" | "video";
  source: string;
  height: number;
};

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function HomeScreen() {
  const router = useRouter();
  const [data, setData] = useState<MediaItem[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGallery = async (): Promise<MediaItem[]> => {
    try {
      const res = await fetch(
        "https://raw.githubusercontent.com/jasneljuillet/cvu-moblie-app/main/data/gallery.json"
      );
      const json = await res.json();
      return shuffleArray(
        json.map((item: any) => ({
          ...item,
          height: randomHeight(240, 340), // ajoute height random
        }))
      );
    } catch (err) {
      console.error("Error fetching gallery:", err);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      const initial = await fetchGallery();
      setData(initial);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={require("./Basketball.json")}
          autoPlay
          loop
          style={{ width: 200, height: 200 }}
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MasonryGallery
        data={data}
        onRefreshData={fetchGallery} // re-fetch sou pull-to-refresh
        onPress={(item) =>
          router.push({
            pathname: "/gallery/[id]",
            params: { id: item.id },
          })
        }
      />
    </View>
  );
}
