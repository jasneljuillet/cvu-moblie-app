// AboutUsScreen.js
import axios from "axios";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Avatar, Card } from "react-native-paper";

const AboutUsScreen = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true); // 👈

  useEffect(() => {
    axios
      .get("https://cvu-backend.onrender.com/api/persons")
      .then((res) => {
        const filtered = res.data.filter((person) => {
          const hasPlayerRole = person.roles.some(
            (r) => r.role?.name === "PLAYER"
          );
          return !hasPlayerRole;
        });
        setPersons(filtered);
      })
      .catch((err) => {
        console.error("Error fetching persons:", err);
      })
      .finally(() => setLoading(false)); // 👈
  }, []);

  const renderMember = ({ item }) => (
    <Card style={styles.card}>
      <Avatar.Image
        size={150}
        source={{ uri: item.avatarProfile }}
        style={styles.avatar}
      />
      <View style={styles.cardText}>
        <Text style={styles.name}>{`${item.firstname} ${item.lastname}`}</Text>
        <Text style={styles.role}>
          {item.roles.map((r) => r.role.name).join(", ")}
        </Text>
      </View>
    </Card>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 0.9 }}>
      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.teamTitle}>Team introduction</Text>
        <Text style={styles.aboutText}>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
        </Text>
      </View>

      {/* Team Section */}
      <View style={styles.teamSection}>
        <Text style={styles.teamTitle}>Head Team</Text>

        {loading ? ( // 👈 spinner pandan loading
          <ActivityIndicator
            size="large"
            color="#5BF62F"
            style={{ marginTop: 20 }}
          />
        ) : persons.length === 0 ? ( // 👈 fallback si pa gen done
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Pa gen manm pou montre
          </Text>
        ) : (
          <FlatList
            data={persons}
            renderItem={renderMember}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
          />
        )}
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  // ... rete menm jan ak ou te genyen
  card: {
    width: width * 0.5,
    marginRight: 15,
    borderRadius: 15,
    overflow: "hidden",
    elevation: 3,
    alignItems: "center",
    paddingVertical: 10,
  },
  avatar: {
    marginBottom: 10,
  },
  cardText: {
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  role: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  teamSection: {
    paddingVertical: 20,
  },
  teamTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#000",
  },
  aboutSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  aboutText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    textAlign: "center",
  },
});

export default AboutUsScreen;
