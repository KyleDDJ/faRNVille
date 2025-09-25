import React from "react";
import { Text, View } from "react-native";

import { COLORS } from "@/constants/Colors";
type FarmingSummaryCardProps = {
  sprint_name: string;
  minutes_left: string;
  remaning_seed: number;
  possible_income: number;
  planted_plants: number;
};

const FarmingSummaryCard: React.FC<FarmingSummaryCardProps> = ({
  sprint_name,
  minutes_left,
  remaning_seed,
  possible_income,
  planted_plants,
}) => {
  return (
    <View
      className="rounded-2xl mb-2  mt-2 p-6 mx-3"
      style={{ backgroundColor: COLORS.green }}
    >
      <View className="flex-row justify-between items-center mb-5">
        <Text
          className="text-2xl mb-1 font-bold"
          style={{ color: COLORS.white }}
        >
          {sprint_name}
        </Text>
        <Text className=" text-sm" style={{ color: COLORS.white }}>
          {minutes_left}m left
        </Text>
      </View>

      <View className="w-full mb-1">
        <View className="flex-row justify-around w-full mb-1">
          <View className="items-center">
            <Text className="font-semibold" style={{ color: COLORS.white }}>
              {remaning_seed}
            </Text>
            <Text className="text-sm" style={{ color: COLORS.white }}>
              Remaining seeds
            </Text>
          </View>

          <View className="items-center">
            <Text className="font-semibold" style={{ color: COLORS.white }}>
              ${possible_income}.00
            </Text>
            <Text className="text-sm" style={{ color: COLORS.white }}>
              Possible Income
            </Text>
          </View>

          <View className="items-center">
            <Text className="font-semibold" style={{ color: COLORS.white }}>
              {planted_plants}
            </Text>
            <Text className="text-sm" style={{ color: COLORS.white }}>
              Planted Plants
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FarmingSummaryCard;
