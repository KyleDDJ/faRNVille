import { COLORS } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        tabBarActiveTintColor: COLORS.white,
        tabBarInactiveTintColor: COLORS.gray400,
        tabBarStyle: {
          position: "absolute",
          borderRadius: 25,
          backgroundColor: COLORS.leafy_green2,
          height: 80,
          borderTopColor: COLORS.leafy_green2,
          paddingBottom: 5,
        },
        tabBarItemStyle: {
          paddingTop: 12,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          marginTop: 4,
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome6
              name="basket-shopping"
              size={focused ? 26 : 24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: "Farm",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="barn"
              size={focused ? 32 : 29}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="seed"
        options={{
          title: "Seeds",
          headerShown: false,
          tabBarIcon: ({ focused, color }) => (
            <FontAwesome5
              name="seedling"
              size={focused ? 28 : 24}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
