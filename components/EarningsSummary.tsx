import { COLORS } from "@/constants/Colors";
import { usePlants } from "@/contexts/PlantsContext";
import React from "react";
import { Image, Platform, Text, View } from "react-native";

type EarningsSummaryProps = {
  user_name?: string;
  greeting?: string;
};

const EarningsSummary: React.FC<EarningsSummaryProps> = ({
  user_name = "Calvin Kyle",
  greeting = "Hello,",
}) => {
  const { money } = usePlants();

  const sizes = {
    avatar: Platform.select({ web: 50, default: 48 }),
    greeting: Platform.select({ web: 15, default: 14 }),
    userName: Platform.select({ web: 20, default: 24 }),
    label: Platform.select({ web: 15, default: 14 }),
    earnings: Platform.select({ web: 30, default: 28 }),
    border: Platform.select({ web: 0, default: 30 }),
    paddingVertical: Platform.select({ web: 15, default: 30 }),
    paddingHorizontal: Platform.select({ web: 30, default: 15 }),
  };

  return (
    <View
      className="flex-row justify-between bg-green items-center"
      style={{
        elevation: 8,

        borderBottomLeftRadius: sizes.border,
        borderBottomRightRadius: sizes.border,
        paddingVertical: sizes.paddingVertical,
        paddingHorizontal: sizes.paddingHorizontal,
      }}
    >
      <View className="flex-row items-center">
        <Image
          source={require("@/assets/avatars/user.jpg")}
          resizeMode="cover"
          style={{
            width: sizes.avatar,
            height: sizes.avatar,
            borderRadius: sizes.avatar / 2,
            marginRight: 10,
          }}
        />
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
            {user_name}
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
    </View>
  );
};

export default EarningsSummary;
