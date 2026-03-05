import axios from "axios";
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Avatar, Card } from "react-native-paper";

const AboutUsScreen = () => {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPersons = async () => {
    try {
      const res = await axios.get(
        "https://cvu-backend.onrender.com/api/persons"
      );
      const filtered = res.data.filter((person) => {
        const hasPlayerRole = person.roles.some(
          (r) => r.role?.name === "PLAYER"
        );
        return !hasPlayerRole;
      });
      setPersons(filtered);
    } catch (err) {
      console.error("Error fetching persons:", err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPersons();
  }, []);

  const renderMember = ({ item }) => (
    <Card style={styles.card}>
      <Avatar.Image
        size={150}
        source={{ uri: item.avatarProfile }}
        style={styles.avatar}
      />
      <View style={styles.cardText}>
        <Text style={styles.name}>{`${
          item.firstname
        } ${item.lastname.toUpperCase()}`}</Text>
        <Text style={styles.role}>
          {item.roles.map((r) => r.role.name).join(", ")}
        </Text>
      </View>
    </Card>
  );

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 0.8 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#5BF62F"]}
        />
      }
    >
      {/* Custom loader pou refresh */}
      {refreshing && (
        <View style={{ alignItems: "center", marginVertical: 20 }}>
          <LottieView
            source={require("./SandyLoading.json")}
            autoPlay
            loop
            style={{ width: 120, height: 120 }}
          />
          <Text style={{ marginTop: 8, color: "#5BF62F" }}></Text>
        </View>
      )}

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.teamTitle}>Team introduction</Text>
        <Text style={styles.aboutText}>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
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

        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <LottieView
              source={require("./SandyLoading.json")}
              autoPlay
              loop
              style={{ width: 150, height: 150 }}
            />
            <Text style={{ marginTop: 10, color: "#5BF62F" }}>
              {/* Ap chaje manm yo... */}
            </Text>
          </View>
        ) : persons.length === 0 ? (
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
