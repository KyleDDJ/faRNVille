import { COLORS } from "@/constants/Colors";
import { HarvestInfo } from "@/entities/plant.entities";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface HarvestModalProps {
  visible: boolean;
  info: HarvestInfo | null;
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
          <MaterialCommunityIcons
            name="cash-plus"
            size={70}
            color={COLORS.green}
          />

          <Text
            className="text-2xl font-bold mb-4"
            style={{ color: COLORS.green }}
          >
            Harvest Successful!
          </Text>
          <Text className="text-center text-gray-600 font-bold text-black mb-6">
            {info
              ? `You've earned $${info.profit.toFixed(2)} by harvesting ${
                  info.name
                }!`
              : ""}
          </Text>

          <TouchableOpacity
            className="rounded-3xl w-full py-3"
            style={{ backgroundColor: COLORS.green }}
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
