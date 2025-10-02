import { COLORS } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";

type AddPlantButtonProps = {
  title: string;
  on_press?: () => void;
  borderColor?: string;
};

const AddPlantButton: React.FC<AddPlantButtonProps> = ({
  title,
  on_press,
  borderColor = COLORS.leafy_green1,
}) => {
  return (
    <TouchableOpacity
      onPress={on_press}
      activeOpacity={0.8}
      className="w-10/12 self-center rounded-2xl p-6 items-center"
      style={{
        borderWidth: 3,
        borderColor,
        borderStyle: "dashed",
        maxWidth: Platform.OS === "web" ? 600 : "100%",
      }}
    >
      <View className="mb-4">
        <FontAwesome5 name="leaf" size={32} color={COLORS.leafy_green1} />
      </View>
      <Text className="text-lg font-semibold text-leafygreen1">{title}</Text>
    </TouchableOpacity>
  );
};

export default AddPlantButton;
