import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function TabLayout() {
  return (
    <Tabs
      safeAreaInsets={{ bottom: 0 }}
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.gray,

        tabBarStyle: {
          height: 78, // 👈 OGMENTE WOTÈ
          paddingBottom: 12, // 👈 plis espas pou dwèt
          paddingTop: 8,
          backgroundColor: "black",
          borderTopWidth: 0,
          elevation: 10,
        },
      }}
      // safeAreaInsets={{ bottom: 0 }}
      // screenOptions={{
      //   headerShown: false,
      //   tabBarActiveTintColor: Colors.primary,
      //   tabBarInactiveTintColor: Colors.gray,
      //   tabBarActiveBackgroundColor: "black",

      //   tabBarItemStyle: {
      //     paddingHorizontal: 6,
      //   },

      //   tabBarStyle: {
      //     backgroundColor: "black",
      //     elevation: 5,
      //   },

      //   tabBarLabelStyle: {
      //     fontSize: 12,
      //     fontWeight: "500",
      //   },
      // }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="calendar"
        options={{
          title: "Calendar",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "calendar" : "calendar-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="players"
        options={{
          title: "Players",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="about"
        options={{
          title: "About Us",
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={
                focused ? "information-circle" : "information-circle-outline"
              }
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
