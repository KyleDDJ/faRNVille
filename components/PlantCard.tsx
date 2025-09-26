import { COLORS } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type PlantCardProps = {
  plant: Plants;
  onAdd?: (plant: Plants) => void;
  variant?: "shop" | "seeds";
  showAddButton?: boolean;
  isActive?: boolean;
};

const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  onAdd,
  variant = "shop",
  showAddButton = true,
  isActive = false,
}) => {
  const getMiddleText = () => {
    if (variant === "shop") {
      return `Harvest in ${plant.harvestTime} | Cost: $${plant.cost}.00`;
    } else {
      return `Harvest in ${plant.harvestTime} | Stock: ${plant.stock}`;
    }
  };

  return (
    <View
      className="rounded-2xl p-2 mx-4 my-3 flex-row items-center"
      style={{
        backgroundColor: isActive ? COLORS.gray200 : COLORS.white,
        borderWidth: 1,
        borderColor: isActive ? COLORS.lightgreen : COLORS.gray300,
        elevation: 6,
      }}
    >
      <Image
        source={plant.image}
        className="w-36 h-28 rounded-2xl mr-4"
        resizeMode="cover"
      />

      <View className="flex-1 pb-4">
        <Text
          className="text-2xl font-bold mb-1"
          style={{ color: COLORS.green }}
        >
          {plant.name}
        </Text>

        <Text className="font-bold text-sm text-gray-400 mb-1">
          {getMiddleText()}
        </Text>
        <Text className="text-lg font-bold" style={{ color: COLORS.green }}>
          Profit: ${plant.profit}.00
        </Text>
      </View>

      {showAddButton && (
        <TouchableOpacity
          onPress={() => onAdd?.(plant)}
          className="w-20 h-11 rounded-full items-center justify-center mt-16"
          style={{ backgroundColor: COLORS.leafy_green1 }}
        >
          <Text className="font-semibold text-white">Buy</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlantCard;
