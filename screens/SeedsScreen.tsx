import { defaultBackground } from "@/constants/Colors";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EarningsSummary from "@/components/EarningSummary";
import PlantCard from "@/components/PlantCard";
import { PLANTS } from "@/constants/Plant";

const SeedsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
      <EarningsSummary />
      <View className="flex-1 pt-6 pb-16">
        {PLANTS.map(plant => (
          <PlantCard
            key={plant.id}
            plant={plant}
            variant="seeds"
            showAddButton={false}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default SeedsScreen;
