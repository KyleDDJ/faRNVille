import { COLORS } from "@/constants/Colors";
import { usePlants } from "@/contexts/PlantsContext";
import { useUser } from "@/contexts/UserContext";
import { useGoogleAuth } from "@/hooks/useGoogleAuth";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Platform, Text, TouchableOpacity, View } from "react-native";

type EarningsSummaryProps = {
  greeting?: string;
};

const EarningsSummary: React.FC<EarningsSummaryProps> = ({
  greeting = "Hello,",
}) => {
  const { money } = usePlants();
  const { user } = useUser();
  const router = useRouter();
  const { logout } = useGoogleAuth();

  const sizes = {
    avatar: Platform.select({ web: 40, default: 48 }),
    greeting: Platform.select({ web: 15, default: 14 }),
    userName: Platform.select({ web: 20, default: 20 }),
    label: Platform.select({ web: 15, default: 14 }),
    earnings: Platform.select({ web: 30, default: 28 }),
    border: Platform.select({ web: 0, default: 30 }),
    padVerti: Platform.select({ web: 15, default: 30 }),
    padHori: Platform.select({ web: 30, default: 15 }),
    bottomColor: Platform.select({
      web: COLORS.leafy_green,
      default: undefined,
    }),
    bottomWidth: Platform.select({ web: 5, default: undefined }),
  };

  const handleLogout = async () => {
    await logout();
    router.push("/(auth)/login");
  };

  const displayName = user?.given_name || user?.name || "Guest User";

  const avatarSource = user?.photo
    ? { uri: user.photo }
    : require("@/assets/avatars/blank-profile.jpg");

  return (
    <View
      className="flex-row justify-between bg-green items-center"
      style={{
        elevation: 8,
        borderBottomLeftRadius: sizes.border,
        borderBottomRightRadius: sizes.border,
        paddingVertical: sizes.padVerti,
        paddingHorizontal: sizes.padHori,
        borderBottomWidth: sizes.bottomWidth,
        borderBottomColor: sizes.bottomColor,
      }}
    >
      <View className="flex-row items-center">
        <TouchableOpacity onPress={handleLogout}>
          <Image
            source={avatarSource}
            resizeMode="cover"
            style={{
              width: sizes.avatar,
              height: sizes.avatar,
              borderRadius: sizes.avatar / 2,
              marginRight: 10,
              backgroundColor: COLORS.leafy_green,
            }}
          />
        </TouchableOpacity>
        <View>
          <Text
            className="text-white mb-1"
            style={{ fontSize: sizes.greeting }}
          >
            {greeting}
          </Text>
          <Text
            className="font-bold text-white"
            style={{ fontSize: sizes.userName }}
          >
            {displayName}
          </Text>
        </View>
      </View>

      <View className="items-end">
        <Text
          className="text-gray-300 mb-1 font-bold mr-6"
          style={{ fontSize: sizes.label }}
        >
          Earnings!
        </Text>
        <Text
          className="font-bold text-white"
          style={{
            fontSize: sizes.earnings,
            fontWeight: "bold",
            color: money < 1 ? COLORS.red : COLORS.white,
          }}
        >
          ${money.toFixed(2)}
        </Text>
      </View>
      <View className="items-center bg-red rounded-2xl mt-6">
        <TouchableOpacity
          onPress={handleLogout}
          className="bg-red-600 py-3 px-8 rounded-xl"
        >
          <Text className="text-white font-semibold text-base">Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EarningsSummary;
