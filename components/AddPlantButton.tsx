import { COLORS } from "@/constants/Colors";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type AddPlantButtonProps = {
  title: string;
  on_press?: () => void;
  borderColor?: string;
};

const AddPlantButton: React.FC<AddPlantButtonProps> = ({
  title,
  on_press,
  borderColor = COLORS.gray400,
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
      }}
    >
      <View className="mb-4">
        <FontAwesome5 name="leaf" size={32} color={COLORS.gray400} />
      </View>
      <Text className="text-lg font-semibold" style={{ color: COLORS.gray400 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AddPlantButton;
