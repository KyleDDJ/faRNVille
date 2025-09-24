import { COLORS } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type ShopCardProps = {
  plant: Plants;
  onAdd?: (plant: Plants) => void;
  variant?: "shop" | "seeds";
  showAddButton?: boolean;
};

const ShopCard: React.FC<ShopCardProps> = ({
  plant,
  onAdd,
  variant = "shop",
  showAddButton = true,
}) => {
  const getMiddleText = () => {
    if (variant === "shop") {
      return `Harvest in ${plant.harvestTime} | Cost: ${plant.cost}`;
    } else {
      return `Harvest in ${plant.harvestTime} | Stock: ${plant.stock}`;
    }
  };

  return (
    <View className="bg-white rounded-3xl p-4 mx-4 my-3 flex-row items-center border border-gray-200  ">
      <Image
        source={plant.image}
        className="w-36 h-28 rounded-2xl mr-4"
        resizeMode="cover"
      />

      <View className="flex-1 pb-4">
        <Text
          className="text-2xl font-bold mb-1"
          style={{ color: COLORS.leafy_green2 }}
        >
          {plant.name}
        </Text>

        <Text className="text-based text-gray-400 mb-1">{getMiddleText()}</Text>
        <Text
          className="text-lg font-bold"
          style={{ color: COLORS.leafy_green2 }}
        >
          Profit: {plant.profit}
        </Text>
      </View>

      {showAddButton && (
        <TouchableOpacity
          onPress={() => onAdd?.(plant)}
          className="w-12 h-12 rounded-full items-center justify-center ml-3"
          style={{ backgroundColor: COLORS.leafy_green2 }}
        >
          <FontAwesome5 name="plus" size={24} color={COLORS.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ShopCard;
