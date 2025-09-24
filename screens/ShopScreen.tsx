import EarningsSummary from "@/components/EarningSummary";
import PlantCard from "@/components/PlantCard";
import { defaultBackground } from "@/constants/Colors";
import { PLANTS } from "@/constants/Plant";
import { Plants } from "@/entities/plant.entities";
import React from "react";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ShopScreen = () => {
  const handleAddPlant = (plant: Plants) => {
    console.log("Add", plant.name);
  };

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: defaultBackground }}
    >
      <EarningsSummary />
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
      >
        {PLANTS.map(plant => (
          <PlantCard key={plant.id} plant={plant} onAdd={handleAddPlant} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ShopScreen;
