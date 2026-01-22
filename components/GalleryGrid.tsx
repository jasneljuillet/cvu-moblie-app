import { View, ScrollView } from "react-native";
import GalleryItem from "./GalleryItem";

export default function GalleryGrid({ data, onPress }) {
  const leftColumn = [];
  const rightColumn = [];

  data.forEach((item, index) => {
    if (index % 2 === 0) {
      leftColumn.push(item);
    } else {
      rightColumn.push(item);
    }
  });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{ flexDirection: "row", padding: 8 }}>
        <View style={{ flex: 1 }}>
          {leftColumn.map((item) => (
            <GalleryItem key={item.id} item={item} onPress={onPress} />
          ))}
        </View>

        <View style={{ flex: 1 }}>
          {rightColumn.map((item) => (
            <GalleryItem key={item.id} item={item} onPress={onPress} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
