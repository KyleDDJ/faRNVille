import { COLORS } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";

type FarmDashboardProps = {
  plant: Plants & { uniqueId: number };
  progress: number;
  time_left: string;
  onRemove: (plant: Plants & { uniqueId: number }) => void;
  onHarvest: (plant: Plants & { uniqueId: number }) => void;
};

const FarmDashboard: React.FC<FarmDashboardProps> = ({
  plant,
  progress,
  time_left,
  onRemove,
  onHarvest,
}) => {
  const isReady = progress >= 1;

  return (
    <View className="mb-3">
      <View
        className="w-11/12 flex-row self-center mt-1 rounded-2xl p-3 items-center"
        style={{
          borderWidth: 1,
          borderColor: COLORS.gray300,
          backgroundColor: "white",
        }}
      >
        <Image
          source={plant.image}
          className="w-28 h-28 rounded-xl mr-3"
          resizeMode="cover"
        />
        <View className="flex-col flex-1 mt-10">
          <Text className="text-lg font-bold" style={{ color: COLORS.green }}>
            {plant.name}
            {isReady && (
              <Text className="text-green-600 font-semibold">
                (+${plant.profit.toFixed(2)})
              </Text>
            )}
          </Text>

          <Text
            className={`text-base ${
              isReady ? "text-green-600" : "text-gray-600"
            } mb-1`}
          >
            {isReady ? "Harvest now!" : `Harvest in ${time_left}`}
          </Text>

          <Progress.Bar
            progress={progress}
            width={235}
            height={8}
            borderRadius={6}
            borderWidth={0}
            color={
              isReady
                ? COLORS.green
                : progress > 0.6
                ? COLORS.yellow
                : COLORS.orange
            }
            unfilledColor={COLORS.gray100}
          />
        </View>

        <TouchableOpacity
          className="rounded-2xl px-3 py-1 ml-3 mb-20"
          style={{
            backgroundColor: isReady ? COLORS.lightgreen : COLORS.remove,
          }}
          onPress={() => (isReady ? onHarvest(plant) : onRemove(plant))}
        >
          <Text className="text-white font-semibold">
            {isReady ? "Complete" : "Remove"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FarmDashboard;
