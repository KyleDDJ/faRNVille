import React from "react";
import { View } from "react-native";
import AddPlantButton from "./AddPlantButton";

type NoPlantViewProps = {
  on_add: () => void;
};

const NoPlantView: React.FC<NoPlantViewProps> = ({ on_add }) => {
  return (
    <View style={{ paddingTop: 16, alignItems: "center" }}>
      <AddPlantButton title="Plant a Seed" on_press={on_add} />
    </View>
  );
};

export default NoPlantView;
