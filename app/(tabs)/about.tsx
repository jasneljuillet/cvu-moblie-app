import axios from "axios";
import LottieView from "lottie-react-native";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
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
  const data = [{ founded: 2021, members: 20, partners: 0 }];
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
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

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
            source={require("./Materialwaveloading.json")}
            autoPlay
            loop
            style={{ width: 120, height: 120 }}
          />
          <Text style={{ marginTop: 8, color: "#5BF62F" }}></Text>
        </View>
      )}

      {/* About Section */}
      <View style={styles.aboutSection}>
        <View style={{ alignItems: "center" }}>
          <LottieView
            source={require("./Basketball.json")} // mete yon animasyon bèl nan assets
            autoPlay
            loop
            style={{ width: 120, height: 120 }}
          />
        </View>
        <Text style={styles.teamTitle}>San Limit United</Text>
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
      {/* table */}

      <View style={styles.statsSection}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Founded</Text>
          <Text style={styles.statNumber}>2021</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Members</Text>
          <Text style={styles.statNumber}>20</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Partners</Text>
          <Text style={styles.statNumber}>0</Text>
        </View>
      </View>
      {/* end */}

      {/* Team Section */}
      <View style={styles.teamSection}>
        <Text style={styles.teamTitle}>Executive Board</Text>

        {loading ? (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <LottieView
              source={require("./Materialwaveloading.json")}
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
            {/* Pa gen manm pou montre */}
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
  statsSection: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingHorizontal: 10,
    backgroundColor: "#f5f5f5", // ti background gri
    borderRadius: 12,
    paddingVertical: 1,
  },
  statBox: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5BF62F", // vèt klere
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
});

export default AboutUsScreen;
