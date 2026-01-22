// AboutUsScreen.js
import {
  Dimensions,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Avatar, Card } from "react-native-paper";

const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    role: "General manager & Head coach",
    photo: "https://via.placeholder.com/150",
  },
  {
    id: "2",
    name: "Jane Smith",
    role: "Head coach",
    photo: "https://via.placeholder.com/150",
  },
  {
    id: "3",
    name: "Jasnel Junior Juillet",
    role: "Dirigeant",
    photo:
      "https://github.com/jasneljuillet/cvu-media/blob/main/IMG_1264.jpg?raw=true",
  },
  {
    id: "4",
    name: "Emily Brown",
    role: "Small Forward",
    photo: "https://via.placeholder.com/150",
  },
  // Ou ka ajoute plis manb isit la
];

const AboutUsScreen = () => {
  const renderMember = ({ item }) => (
    <Card style={styles.card}>
      <Avatar.Image
        size={150}
        source={{ uri: item.photo }}
        style={styles.avatar}
      />
      <View style={styles.cardText}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.role}>{item.role}</Text>
      </View>
    </Card>
  );

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Header */}

      {/* About Section */}
      <View style={styles.aboutSection}>
        <Text style={styles.teamTitle}>Team intriduction</Text>
        <Text style={styles.aboutText}>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
          ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor
          sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
          incididunt ut. Sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Sed do eiusmod tempor incididunt ut.
        </Text>
      </View>
      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Founded</Text>
          <Text style={styles.statNumber}>2021</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Persons</Text>
          <Text style={styles.statNumber}>20</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Partenaires</Text>
          <Text style={styles.statNumber}>0</Text>
        </View>
      </View>

      {/* Team Section */}
      <View style={styles.teamSection}>
        <Text style={styles.teamTitle}>Head Team</Text>
        <FlatList
          data={teamMembers}
          renderItem={renderMember}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingLeft: 20, paddingRight: 20 }}
        />
      </View>
    </ScrollView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5BF62F",
  },
  header: {
    backgroundColor: "#5BF62F",
    paddingVertical: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  aboutSection: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    // marginTop: 20,
  },
  aboutText: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22,
    textAlign: "center",
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
  statsSection: {
    flexDirection: "row", // ranje yo sou menm liy
    justifyContent: "space-around", // espas egal ant chak box
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  statBox: {
    alignItems: "center", // santre teks nan chak box
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5BF62F", // koulè ekip la
  },
  statLabel: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
});

export default AboutUsScreen;
