import { COLORS } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface HarvestModalProps {
  visible: boolean;
  info: { name: string; profit: string } | null;
  on_close: () => void;
}

const HarvestModal: React.FC<HarvestModalProps> = ({
  visible,
  info,
  on_close,
}) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View className="flex-1 justify-center items-center bg-black/50">
        <View className="bg-white rounded-2xl p-3 w-[90%] items-center">
          <MaterialIcons
            name="trending-up"
            size={70}
            color={COLORS.lightgreen}
          />

          <Text
            className="text-2xl font-bold mb-4"
            style={{ color: COLORS.lightgreen }}
          >
            Success!
          </Text>
          <Text className="text-center font-bold text-black mb-6">
            {info
              ? `You've earned ${info.profit} by harvesting ${info.name}!`
              : ""}
          </Text>

          <TouchableOpacity
            className="rounded-xl w-full py-4"
            style={{ backgroundColor: COLORS.leafy_green2 }}
            onPress={on_close}
          >
            <Text className="text-white font-bold text-lg text-center">
              Close
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default HarvestModal;
