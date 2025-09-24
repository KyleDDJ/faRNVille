import React from "react";
import { View } from "react-native";
import AddPlantButton from "./AddPlantButton";

const NoPlantView = () => {
  return (
    <View style={{ paddingTop: 16, alignItems: "center" }}>
      <AddPlantButton
        title="Add a Plant"
        onPress={() => console.log("Add a plant pressed!")}
      />
    </View>
  );
};

export default NoPlantView;
