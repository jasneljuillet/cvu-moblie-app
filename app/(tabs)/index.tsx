import MasonryGallery from "@/components/MasonryGallery";
import { galleryData } from "@/data/gallery";
import { useRouter } from "expo-router";
import { useMemo } from "react";
import { View } from "react-native";

function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function HomeScreen() {
  const router = useRouter();

  const initialData = useMemo(() => shuffleArray(galleryData), []);

  return (
    <View style={{ flex: 1 }}>
      <MasonryGallery
        data={initialData}
        onRefreshData={() => shuffleArray(galleryData)}
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
