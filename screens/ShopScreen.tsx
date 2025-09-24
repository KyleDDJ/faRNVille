import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EarningsSummary from "@/components/EarningSummary";
import PlantCard from "@/components/PlantCard";
import { defaultBackground } from "@/constants/Colors";
import { PLANTS } from "@/constants/Plant";
import { Plants } from "@/entities/plant.entities";

const ShopScreen = () => {
  const handleAddPlant = (plant: Plants) => {
    console.log("Buy", plant.name);
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: defaultBackground }}
    >
      <EarningsSummary />
      <View className="flex-1 pt-6 pb-16">
        <FlatList
          data={PLANTS}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <PlantCard plant={item} onAdd={handleAddPlant} variant="shop" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShopScreen;
