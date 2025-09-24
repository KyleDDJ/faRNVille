import { COLORS } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";

type PlantDashboardProps = {
  plant: Plants;
};

const FarmDashboard: React.FC<PlantDashboardProps> = ({ plant }) => {
  return (
    <View className="mb-1">
      <View
        className="w-11/12 flex-row self-center mt-5 rounded-2xl p-2 items-center"
        style={{
          borderWidth: 1,
          borderColor: COLORS.gray300,
        }}
      >
        <Image
          source={plant.image}
          className="w-40 h-32 rounded-xl mr-4"
          resizeMode="cover"
        />
        <View className="flex-col flex-1 mt-1">
          <Text className="text-xl font-bold">{plant.name}</Text>
          <Text className="text-gray-600 text-base mb-1">
            Harvest in: <Text className="font-mono text-base">00:04:20</Text>
          </Text>
          <Progress.Bar
            progress={0.2}
            width={135}
            height={10}
            color={COLORS.orange}
            borderRadius={5}
          />
        </View>
        <TouchableOpacity
          className="rounded-2xl px-3 py-1 ml-3 mb-24"
          style={{ backgroundColor: COLORS.remove }}
          onPress={() => console.log("Remove seed")}
        >
          <Text className="text-white font-semibold">Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FarmDashboard;
