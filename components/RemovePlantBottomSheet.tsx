import { COLORS, defaultBackground } from "@/constants/Colors";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface RemovePlantBottomSheetProps {
  snap_points: string[];
  plant_to_remove: any;
  on_confirm: () => void;
  on_cancel: () => void;
}

const RemovePlantBottomSheet = forwardRef<
  BottomSheetModal,
  RemovePlantBottomSheetProps
>(({ snap_points, plant_to_remove, on_confirm, on_cancel }, ref) => {
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snap_points}
      enablePanDownToClose
      backgroundStyle={{
        backgroundColor: defaultBackground,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      }}
      handleIndicatorStyle={{ backgroundColor: COLORS.gray600 }}
      backdropComponent={props => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.5}
        />
      )}
    >
      <BottomSheetView className="flex-1 py-3 px-4">
        {plant_to_remove && (
          <>
            <View className="items-center mb-3">
              <FontAwesome6 name="trash-can" size={35} color={COLORS.red} />
            </View>
            <Text className="text-xl font-bold text-center text-gray-600">
              Confirm remove {plant_to_remove.name}?
            </Text>

            <View className="flex-col justify-center items-center mt-6 w-full space-y-4 ">
              <TouchableOpacity
                className="rounded-3xl py-4 w-full mb-2 bg-red"
                onPress={on_confirm}
              >
                <Text className="text-white font-bold text-center">Remove</Text>
              </TouchableOpacity>

              <TouchableOpacity
                className="rounded-3xl py-4 w-full bg-gray-300"
                onPress={on_cancel}
              >
                <Text className="text-gray-600 font-bold text-center">
                  Cancel
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

export default RemovePlantBottomSheet;
