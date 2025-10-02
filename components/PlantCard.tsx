import { COLORS } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

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
  on_add,
  variant = "shop",
  show_add_button = true,
  is_active = false,
  inventory_count,
}) => {
  const getMiddleText = () => {
    if (variant === "shop") {
      return (
        <Text className="text-sm text-gray-500 mb-1">
          Harvest in {plant.harvest_time} |{" "}
          <Text className=" text-green text-l font-bold">
            Cost: ${plant.cost}.00
          </Text>
        </Text>
      );
    } else {
      const stockText = inventory_count
        ? `${inventory_count} seeds available`
        : plant.stock;

      return (
        <Text className="text-sm  text-gray-500 mb-1">
          Harvest in {plant.harvest_time} |{" "}
          <Text className=" text-green text-l font-bold">
            Stock: {stockText}
          </Text>
        </Text>
      );
    }
  };

  const screenWidth = Dimensions.get("window").width;

  const imgWidth = Platform.OS === "web" ? screenWidth * 0.11 : 144;
  const imgHeight = imgWidth * 0.75;

  return (
    <View
      className="rounded-2xl p-2 mx-4 my-3 flex-row items-center"
      style={{
        backgroundColor: is_active ? COLORS.gray200 : COLORS.white,
        borderWidth: 1,
        borderColor: is_active ? COLORS.lightgreen : COLORS.gray300,
      }}
    >
      <Image
        source={plant.image}
        style={{
          width: imgWidth,
          height: imgHeight,
          borderRadius: 16,
          marginRight: 16,
        }}
        resizeMode="cover"
      />
      <View className="flex-1 pb-4">
        <Text className="text-2xl font-bold mb-1 text-green">{plant.name}</Text>

        <Text className="font-semibold mb-1">{getMiddleText()}</Text>
        <Text className="text-l font-semibold text-gray-500">
          Profit: ${plant.profit}.00
        </Text>
      </View>

      {show_add_button && (
        <TouchableOpacity
          onPress={() => on_add?.(plant)}
          className="w-20 h-11 flex-row gap-1 rounded-full items-center bg-lightgreen justify-center mt-16"
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
