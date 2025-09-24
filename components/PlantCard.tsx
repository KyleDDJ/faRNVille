import { COLORS } from "@/constants/Colors";
import { Plants } from "@/entities/plant.entities";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

type ShopCardProps = {
  plant: Plants;
  onAdd?: (plant: Plants) => void;
};

const ShopCard: React.FC<ShopCardProps> = ({ plant, onAdd }) => {
  return (
    <View className="bg-white rounded-3xl p-4 mx-4 my-3 flex-row items-center border border-gray-200 shadow-lg">
      <Image
        source={plant.image}
        className="w-36 h-28 rounded-2xl mr-4"
        resizeMode="cover"
      />

      <View className="flex-1 pb-10">
        <Text
          className="text-2xl font-bold mb-1"
          style={{ color: COLORS.leafy_green2 }}
        >
          {plant.name}
        </Text>

        <Text className="text-sm text-gray-400 mb-1">
          Harvest in {plant.harvestTime} | Cost: {plant.cost}
        </Text>

        <Text
          className="text-lg font-bold"
          style={{ color: COLORS.leafy_green2 }}
        >
          Profit: {plant.profit}
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => onAdd?.(plant)}
        className="mt-6 self-end"
      >
        <Entypo name="circle-with-plus" size={35} color={COLORS.leafy_green2} />
      </TouchableOpacity>
    </View>
  );
};

export default ShopCard;
