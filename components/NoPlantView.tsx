import React from "react";
import { View } from "react-native";
import AddPlantButton from "./AddPlantButton";

type NoPlantViewProps = {
  onAdd: () => void;
};

const NoPlantView: React.FC<NoPlantViewProps> = ({ onAdd }) => {
  return (
    <View style={{ paddingTop: 16, alignItems: "center" }}>
      <AddPlantButton title="Add a Plant" onPress={onAdd} />
    </View>
  );
};

export default NoPlantView;
