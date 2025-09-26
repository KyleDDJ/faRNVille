import { COLORS, defaultBackground } from "@/constants/Colors";
import React from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EarningsSummary from "@/components/EarningSummary";
import PlantCard from "@/components/PlantCard";
import { PLANTS } from "@/constants/Plant";
import { usePlants } from "@/contexts/PlantsContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const SeedsScreen = () => {
  const { inventory } = usePlants();

  const purchasedPlants = PLANTS.filter(
    plant => inventory[plant.id] && inventory[plant.id] > 0
  ).map(plant => ({
    ...plant,
    stock: `${inventory[plant.id]} seeds available`,
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
      <EarningsSummary />
      <View className="flex-1 pt-6 pb-16">
        {purchasedPlants.length > 0 ? (
          <FlatList
            data={purchasedPlants}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <PlantCard
                plant={item}
                variant="seeds"
                showAddButton={false}
                inventoryCount={inventory[item.id]}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 64 }}
          />
        ) : (
          <View className="flex-1 justify-center items-center px-4">
            <MaterialCommunityIcons
              name="seed-off"
              size={48}
              color={COLORS.leafy_green1}
              className="mb-4"
            />
            <Text
              className="text-center text-lg font-semibold mb-2"
              style={{ color: COLORS.leafy_green1 }}
            >
              Oops! Your inventory is empty.
            </Text>
            <Text className="text-center text-gray-500 text-base px-6">
              Visit the Shop to buy seeds and start planting your farm!
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SeedsScreen;
