import MasonryList from "@react-native-seoul/masonry-list";
import LottieView from "lottie-react-native";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";
import GalleryCard from "./GalleryCard";

export type MediaItem = {
  id: string;
  type: "image" | "video";
  source: string;
  height: number;
};

type Props = {
  data: MediaItem[];
  onPress: (item: MediaItem) => void;
  onRefreshData: () => Promise<MediaItem[]>;
  backgroundColor?: string;
};

export default function MasonryGallery({
  data,
  onPress,
  onRefreshData,
  backgroundColor = "#fff",
}: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState<MediaItem[]>([]);
  const [version, setVersion] = useState(0);

  useEffect(() => {
    setItems(
      data.map((item) => ({
        ...item,
        refreshId: Math.random().toString(),
      }))
    );
  }, [data]);

  const onRefresh = async () => {
    setRefreshing(true);
    const newItems = await onRefreshData();
    setItems(
      newItems.map((item) => ({
        ...item,
        refreshId: Math.random().toString(),
      }))
    );
    setVersion((prev) => prev + 1);
    setRefreshing(false);
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <MasonryList
        data={items}
        extraData={version}
        numColumns={2}
        keyExtractor={(item) => item.id + (item.refreshId ?? "")}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 12 }}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingTop: Platform.OS === "ios" ? 120 : 140,
          paddingBottom: 24,
        }}
        renderItem={({ item }) => (
          <GalleryCard item={item} onPress={() => onPress(item)} />
        )}
        // Custom loader header
        ListHeaderComponent={
          refreshing ? (
            <View style={{ alignItems: "center", marginVertical: 20 }}>
              <LottieView
                source={require("../app/(tabs)/Basketball.json")}
                autoPlay
                loop
                style={{ width: 100, height: 100 }}
              />
            </View>
          ) : null
        }
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}
