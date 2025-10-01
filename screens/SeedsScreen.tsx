import { COLORS, defaultBackground } from "@/constants/Colors";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EarningsSummary from "@/components/EarningsSummary";
import PlantCard from "@/components/PlantCard";
import SeedsSkeletonCard from "@/components/SeedsSkeleton";
import { PLANTS } from "@/constants/Plant";
import { usePlants } from "@/contexts/PlantsContext";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

/* Screen: SeedsScreen
 * Main Expo Router screen for managing seed inventory
 */
const SeedsScreen: React.FC = () => {
  /* Contexts */
  const { inventory } = usePlants();

  /* Local state */
  const [loading, setLoading] = useState(true);

  /*
   * DOCU: Compute purchased plants from inventory
   */
  const purchasedPlants = PLANTS.filter(
    plant => inventory[plant.id] && inventory[plant.id] > 0
  ).map(plant => ({
    ...plant,
    stock: `${inventory[plant.id]} seeds available`,
  }));

  /* Skeleton data for loading state */
  const skeletonData = Array.from({ length: 6 }).map((_, i) => i);

  /*
   * DOCU: Render inventory FlatList
   */
  const renderInventory = () => (
    <FlatList
      data={purchasedPlants}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <PlantCard
          plant={item}
          variant="seeds"
          show_add_button={false}
          inventory_count={inventory[item.id]}
        />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 64 }}
    />
  );

  /*
   * DOCU: Render skeleton FlatList while loading
   */
  const renderSkeleton = () => (
    <FlatList
      data={skeletonData}
      keyExtractor={item => item.toString()}
      renderItem={() => <SeedsSkeletonCard />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 64 }}
    />
  );

  /*
   * DOCU: Render empty inventory view
   */
  const renderEmptyInventory = () => (
    <View className="flex-1 justify-center items-center px-6">
      <MaterialCommunityIcons
        name="seed-off"
        size={48}
        color={COLORS.leafy_green1}
        accessibilityLabel="Empty inventory icon"
        className="mb-4"
      />
      <Text className="text-center text-lg font-semibold mb-2 text-leafygreen1">
        Oops! Your inventory is empty.
      </Text>
      <Text className="text-center text-base text-gray-500">
        Visit the Shop to buy seeds and start planting your farm!
      </Text>
    </View>
  );

  /*
   * DOCU: Set loading timeout
   * Last Updated At: October 1 2025
   */
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  /*
   * DOCU: Render SeedsScreen content
   */
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: defaultBackground }}
    >
      <EarningsSummary />
      <View className="flex-1 pt-6 pb-16">
        {loading
          ? renderSkeleton()
          : purchasedPlants.length > 0
          ? renderInventory()
          : renderEmptyInventory()}
      </View>
    </SafeAreaView>
  );
};

export default SeedsScreen;
