import { defaultBackground } from "@/constants/Colors";
import React from "react";
import { FlatList, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EarningsSummary from "@/components/EarningSummary";
import PlantCard from "@/components/PlantCard";
import { PLANTS } from "@/constants/Plant";

const SeedsScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
      <EarningsSummary />
      <View className="flex-1 pt-6 pb-16">
        <FlatList
          data={PLANTS}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <PlantCard plant={item} variant="seeds" showAddButton={false} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SeedsScreen;
