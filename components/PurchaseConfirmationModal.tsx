import { COLORS } from "@/constants/Colors";
import { PurchaseInfo } from "@/entities/plant.entities";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";

interface PurchaseConfirmationModalProps {
  visible: boolean;
  purchase_info: PurchaseInfo | null;
  on_cancel: () => void;
  on_confirm: () => void;
}

const PurchaseConfirmationModal: React.FC<PurchaseConfirmationModalProps> = ({
  visible,
  purchase_info,
  on_cancel,
  on_confirm,
}) => (
  <Modal animationType="fade" transparent visible={visible}>
    <View className="flex-1 justify-center items-center bg-black/50">
      <View className="bg-white rounded-2xl p-5 w-9/12 items-center">
        <MaterialCommunityIcons
          name="cart-plus"
          size={60}
          color={COLORS.lightgreen}
        />

        <Text className="text-lg text-gray-600 font-bold my-6 text-center">
          {purchase_info
            ? `Confirm ${purchase_info.count} ${
                purchase_info.name
              }(s) for $${purchase_info.cost.toFixed(2)}?`
            : ""}
        </Text>

        <View className="flex-row gap-5">
          <TouchableOpacity
            className="px-10 py-3 rounded-full bg-gray-300"
            onPress={on_cancel}
          >
            <Text className="font-semibold text-gray-500">Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="px-10 py-3 rounded-full bg-lightgreen"
            onPress={on_confirm}
          >
            <Text className="text-white font-semibold">Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

export default PurchaseConfirmationModal;
