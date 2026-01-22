import { MediaItem } from "@/data/gallery";
import MasonryList from "@react-native-seoul/masonry-list";
import { useState } from "react";
import { Platform, RefreshControl, View } from "react-native";
import GalleryCard from "./GalleryCard";

type Props = {
  data: MediaItem[];
  onPress: (item: MediaItem) => void;
  onRefreshData: () => MediaItem[];
  backgroundColor?: string; // customizable
  spinnerColor?: string; // spinner kontraste
};

export default function MasonryGallery({
  data,
  onPress,
  onRefreshData,
  backgroundColor = "#fff", // default nwa
  spinnerColor = "#5BF62F", // default vèt
}: Props) {
  const [refreshing, setRefreshing] = useState(false);
  const [items, setItems] = useState(data);
  const [version, setVersion] = useState(0); // fòse MasonryList re-render

  const onRefresh = () => {
    setRefreshing(true);

    setTimeout(() => {
      const newItems = onRefreshData().map((item) => ({
        ...item,
        refreshId: Math.random().toString(),
      }));
      setItems(newItems);
      setVersion((prev) => prev + 1);
      setRefreshing(false);
    }, 500);
  };

  return (
    <View style={{ flex: 1, backgroundColor }}>
      <MasonryList
        data={items}
        extraData={version}
        numColumns={2}
        keyExtractor={(item) => item.id + item.refreshId}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          gap: 12,
        }}
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingTop: Platform.OS === "ios" ? 120 : 140,
          paddingBottom: 24,
        }}
        renderItem={({ item }) => (
          <GalleryCard item={item} onPress={() => onPress(item)} />
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={spinnerColor} // iOS
            colors={[spinnerColor]} // Android
          />
        }
      />
    </View>
  );
}
