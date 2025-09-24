import AddPlantButton from "@/components/AddPlantButton";
import EarningSummary from "@/components/EarningSummary";
import { defaultBackground } from "@/constants/Colors";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FarmScreen: React.FC = () => {
  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: defaultBackground,
      }}
    >
      <EarningSummary />
      <View style={{ paddingTop: 16, alignItems: "center" }}>
        <AddPlantButton
          title="Add a Plant"
          onPress={() => console.log("Add a plant pressed!")}
        />
      </View>
    </SafeAreaView>
  );
};

export default FarmScreen;
