import React from "react";
import { Text, View } from "react-native";

import { COLORS } from "@/constants/Colors";
import { usePlants } from "@/contexts/PlantsContext";

type FarmingSummaryCardProps = {
  sprint_name?: string;
};

const FarmingSummaryCard: React.FC<FarmingSummaryCardProps> = ({
  sprint_name = "Farming Summary",
}) => {
  const { inventory, planted_plants } = usePlants();

  const totalSeeds = Object.values(inventory).reduce(
    (sum, count) => sum + count,
    0
  );
  const plantedCount = planted_plants.length;

  const possibleIncome = planted_plants.reduce(
    (sum, plant) => sum + plant.profit,
    0
  );

  return (
    <View
      className="rounded-2xl mb-2 mt-2 p-6 mx-3"
      style={{ backgroundColor: COLORS.green }}
    >
      <View className="flex-row justify-between items-center mb-5">
        <Text
          className="text-2xl mb-1 font-bold"
          style={{ color: COLORS.white }}
        >
          {sprint_name}
        </Text>
      </View>

      <View className="w-full mb-1">
        <View className="flex-row justify-around w-full mb-1">
          <View className="items-center">
            <Text
              className="font-semibold text-xl"
              style={{ color: COLORS.white }}
            >
              {totalSeeds}
            </Text>
            <Text
              className="text-sm text-center"
              style={{ color: COLORS.white }}
            >
              Remaining seeds
            </Text>
          </View>

          <View className="items-center">
            <Text
              className="font-semibold text-xl"
              style={{ color: COLORS.white }}
            >
              ${possibleIncome.toFixed(2)}
            </Text>
            <Text
              className="text-sm text-center"
              style={{ color: COLORS.white }}
            >
              Possible Income
            </Text>
          </View>

          <View className="items-center">
            <Text
              className="font-semibold text-xl"
              style={{ color: COLORS.white }}
            >
              {plantedCount}
            </Text>
            <Text
              className="text-sm text-center"
              style={{ color: COLORS.white }}
            >
              Planted Plants
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default FarmingSummaryCard;
