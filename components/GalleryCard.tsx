import { MediaItem } from "@/data/gallery";
import { Ionicons } from "@expo/vector-icons";
import { Image as ExpoImage } from "expo-image";
import { useState } from "react";
import { Pressable, View } from "react-native";

type Props = {
  item: MediaItem;
  onPress: () => void;
};

export default function GalleryCard({ item, onPress }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      style={{
        borderRadius: 18,
        marginHorizontal: 8,
        marginBottom: 14,
        overflow: "hidden",
        backgroundColor: "#000", // background nwa
      }}
    >
      {/* PLACEHOLDER */}
      {!loaded && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: item.height,
            backgroundColor: "#111", // placeholder nwa
            borderRadius: 18,
            zIndex: 1,
          }}
        />
      )}

      {/* IMAGE / VIDEO THUMB */}
      <ExpoImage
        source={
          item.type === "image"
            ? item.source
            : require("../assets/images/4.jpg") // thumbnail videyo lokal
        }
        style={{
          width: "100%",
          height: item.height,
        }}
        contentFit="cover"
        transition={300}
        cachePolicy="memory-disk"
        onLoadEnd={() => setLoaded(true)}
      />

      {/* ▶️ BADGE VIDEO */}
      {item.type === "video" && (
        <View
          style={{
            position: "absolute",
            top: "42%",
            left: "42%",
            backgroundColor: "rgba(0,0,0,0.65)",
            borderRadius: 32,
            padding: 12,
            zIndex: 2,
          }}
        >
          <Ionicons name="play" size={30} color="#fff" />
        </View>
      )}
    </Pressable>
  );
}
