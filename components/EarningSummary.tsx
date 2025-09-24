import { COLORS } from "@/constants/Colors";
import React from "react";
import { Image, Text, View } from "react-native";

type EarningsSummaryProps = {
  userName?: string;
  earnings?: string;
  greeting?: string;
};

const EarningsSummary: React.FC<EarningsSummaryProps> = ({
  userName = "Calvin Kyle",
  earnings = "$10.00",
  greeting = "Hello,",
}) => {
  return (
    <View
      className="flex-row justify-between items-center px-6 py-10 rounded-b-3xl"
      style={{ backgroundColor: COLORS.green }}
    >
      <View className="flex-row items-center">
        <Image
          source={require("@/assets/users/user.jpg")}
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
          <Text
            className="text-lg font-semibold text-white"
            style={{ fontSize: 18, fontWeight: "600", color: COLORS.white }}
          >
            {userName}
          </Text>
        </View>
      </View>

      <View className="items-end">
        <Text
          className="text-sm text-white mb-1 font-bold "
          style={{ fontSize: 14, color: COLORS.gray300 }}
        >
          Earnings!
        </Text>
        <Text
          className="text-2xl font-bold text-white"
          style={{ fontSize: 28, fontWeight: "bold", color: COLORS.white }}
        >
          {earnings}
        </Text>
      </View>
    </View>
  );
};

export default EarningsSummary;
