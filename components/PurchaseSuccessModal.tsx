import { COLORS } from "@/constants/Colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface PurchaseSuccessModalProps {
  visible: boolean;
  purchase_info: { name: string; count: string } | null;
  on_close: () => void;
}

const PurchaseSuccessModal: React.FC<PurchaseSuccessModalProps> = ({
  visible,
  purchase_info,
  on_close,
}) => (
  <Modal animationType="fade" transparent visible={visible}>
    <View className="flex-1 justify-center items-center bg-black/50">
      <View className="bg-white rounded-2xl pt-5 pb-4 px-5 w-9/12 items-center">
        <MaterialCommunityIcons
          name="leaf-circle"
          size={48}
          color={COLORS.lightgreen}
        />

        <Text className="text-lg text-gray-600 font-bold mb-4 text-center">
          {purchase_info
            ? `You purchased ${purchase_info.count} ${purchase_info.name}(s)!`
            : ""}
        </Text>

        <TouchableOpacity
          style={{ backgroundColor: COLORS.lightgreen }}
          className="w-full py-3 rounded-full"
          onPress={on_close}
        >
          <Text className="text-white font-semibold text-center">Accept</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default PurchaseSuccessModal;
