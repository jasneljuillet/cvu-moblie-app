import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Pressable, StyleSheet } from "react-native";

export default function BackButton() {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.back()}
      style={({ pressed }) => [styles.button, pressed && { opacity: 0.7 }]}
    >
      <Ionicons name="chevron-back" size={22} color="white" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    top: 50, // ✅ pa twò wo
    left: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "rgba(0,0,0,0.6)",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 20,
  },
});
