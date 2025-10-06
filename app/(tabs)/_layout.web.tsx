import { COLORS } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Slot, usePathname, useRouter } from "expo-router";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function WebTabLayout() {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      name: "shop",
      label: "Shop",
      icon: (color: string) => (
        <FontAwesome6 name="basket-shopping" size={24} color={color} />
      ),
      route: "/shop" as const,
    },
    {
      name: "index",
      label: "Farm",
      icon: (color: string) => (
        <MaterialCommunityIcons name="barn" size={28} color={color} />
      ),
      route: "/" as const,
    },

    {
      name: "seed",
      label: "Seeds",
      icon: (color: string) => (
        <FontAwesome5 name="seedling" size={24} color={color} />
      ),
      route: "/seed" as const,
    },
  ];

  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
      }}
    >
      <View
        style={{
          width: 190,
          backgroundColor: COLORS.green,
          paddingTop: 18,
          paddingHorizontal: 16,
          borderRightWidth: 5,
          borderRightColor: COLORS.leafy_green,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 5,
            paddingBottom: 32,
            marginBottom: 30,
            alignItems: "center",
          }}
        >
          <FontAwesome6 name="seedling" size={40} color={COLORS.gray100} />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: COLORS.gray100,
            }}
          >
            faRNville.
          </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {navItems.map(item => {
            const isActive = pathname === item.route;
            return (
              <TouchableOpacity
                key={item.name}
                onPress={() => router.push(item.route)}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 16,
                  paddingHorizontal: 20,
                  marginVertical: 4,
                  borderRadius: 12,
                  backgroundColor: isActive ? COLORS.semi_white : "transparent",
                }}
              >
                {item.icon(isActive ? COLORS.white : COLORS.gray400)}
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: isActive ? "600" : "400",
                    marginLeft: 16,
                    color: isActive ? COLORS.white : COLORS.gray400,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <View style={{ flex: 1 }}>
        <Slot />
      </View>
    </View>
  );
}
