import { COLORS } from "@/constants/Colors";
import { usePlants } from "@/contexts/PlantsContext";
import React from "react";
import { Image, Text, View } from "react-native";

type EarningsSummaryProps = {
  user_name?: string;
  greeting?: string;
};

const EarningsSummary: React.FC<EarningsSummaryProps> = ({
  user_name = "Calvin Kyle",
  greeting = "Hello,",
}) => {
  const { money } = usePlants();

  return (
    <View
      className="flex-row justify-between bg-green items-center px-6 py-10 rounded-b-3xl"
      style={{
        elevation: 8,
      }}
    >
      <View className="flex-row items-center">
        <Image
          source={require("@/assets/avatars/user.jpg")}
          resizeMode="cover"
          style={{
            width: 48,
            height: 48,
            borderRadius: 24,
            marginRight: 16,
          }}
        />
        <View>
          <Text
            className="text-sm text-white mb-1"
            style={{ fontSize: 14, color: COLORS.white }}
          >
            {greeting}
          </Text>
          <Text className="text-2xl font-bold text-white">{user_name}</Text>
        </View>
      </View>

      <View className="items-end">
        <Text className="text-sm text-gray-300 mb-1 font-bold mr-6">
          Earnings!
        </Text>
        <Text
          className="text-2xl font-bold text-white"
          style={{
            fontSize: 28,
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
