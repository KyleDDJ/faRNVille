import { COLORS } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type PlantCardProps = {
  plant: Plants;
  on_add?: (plant: Plants) => void;
  variant?: "shop" | "seeds";
  show_add_button?: boolean;
  is_active?: boolean;
  inventory_count?: number;
};

const PlantCard: React.FC<PlantCardProps> = ({
  plant,
  on_add: onAdd,
  variant = "shop",
  show_add_button = true,
  is_active = false,
  inventory_count,
}) => {
  const getMiddleText = () => {
    if (variant === "shop") {
      return `Harvest in ${plant.harvestTime} | Cost: $${plant.cost}.00`;
    } else {
      const stockText = inventory_count
        ? `${inventory_count} seeds available`
        : plant.stock;
      return `Harvest in ${plant.harvestTime} | Stock: ${stockText}`;
    }
  };

  return (
    <View
      className="rounded-2xl p-2 mx-4 my-3 flex-row items-center"
      style={{
        backgroundColor: is_active ? COLORS.gray200 : COLORS.white,
        borderWidth: 1,
        borderColor: is_active ? COLORS.lightgreen : COLORS.gray300,
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

      {show_add_button && (
        <TouchableOpacity
          onPress={() => onAdd?.(plant)}
          className="w-20 h-11 flex-row gap-1 rounded-full items-center justify-center mt-16"
          style={{ backgroundColor: COLORS.leafy_green1 }}
        >
          <Text className="font-semibold text-white">Buy</Text>
          <MaterialCommunityIcons
            name="cart-outline"
            size={18}
            color={COLORS.white}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default PlantCard;
