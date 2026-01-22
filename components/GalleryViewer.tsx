import { View, Dimensions } from "react-native";
import { VideoView, useVideoPlayer } from "expo-video";
import BackButton from "./BackButton";

const { width } = Dimensions.get("window");
const height = (width * 4) / 3;

type Props = {
  item: {
    type: "image" | "video";
    source: {
      uri: string;
    };
  };
  onClose: () => void;
};

export default function GalleryViewer({ item, onClose }: Props) {
  const player = useVideoPlayer(item.source.uri, (player) => {
    player.play();
  });

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* Back button flottant */}
      <BackButton onPress={onClose} />

      {/* Zone media 3/4 écran */}
      <View
        style={{
          width,
          height,
          alignSelf: "center",
          marginTop: 80,
        }}
      >
        <VideoView
          player={player}
          style={{ width: "100%", height: "100%" }}
          allowsFullscreen
          allowsPictureInPicture
        />
      </View>
    </View>
  );
}
