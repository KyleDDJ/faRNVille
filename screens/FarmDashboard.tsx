import AddPlantButton from "@/components/AddPlantButton";
import { COLORS } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import * as Progress from "react-native-progress";

type FarmDashboardProps = {
  plant: Plants;
  onRemove: () => void;
  onPlantAgain: () => void;
};

const FarmDashboard: React.FC<FarmDashboardProps> = ({
  plant,
  onRemove,
  onPlantAgain,
}) => {
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
          className="w-40 h-32 rounded-xl mr-3"
          resizeMode="cover"
        />
        <View className="flex-col flex-1 mt-14">
          <Text className="text-xl font-bold">{plant.name}</Text>
          <Text className="text-gray-600 text-base mb-1">
            Harvest in: <Text className="font-mono text-base">00:04:20</Text>
          </Text>
          <Progress.Bar
            progress={0.2}
            width={200}
            height={12}
            color={COLORS.orange}
            borderRadius={5}
          />
        </View>
        <TouchableOpacity
          className="rounded-2xl px-3 py-1 ml-3 mb-24"
          style={{ backgroundColor: COLORS.remove }}
          onPress={onRemove}
        >
          <Text className="text-white font-semibold">Remove</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity>
        <AddPlantButton title="Add a Plant again" onPress={onPlantAgain} />
      </TouchableOpacity>
    </View>
  );
};

export default FarmDashboard;
