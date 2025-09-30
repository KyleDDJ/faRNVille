import PlantCard from "@/components/PlantCard";
import { COLORS, defaultBackground } from "@/constants/Colors";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface AddPlantBottomSheetProps {
  snap_points: string[];
  available_seeds: any[];
  temp_plant: any;
  set_temp_plant: (plant: any) => void;
  on_confirm: () => void;
  on_cancel: () => void;
  inventory: Record<number, number>;
}

const AddPlantBottomSheet = forwardRef<
  BottomSheetModal,
  AddPlantBottomSheetProps
>(
  (
    {
      snap_points,
      available_seeds,
      temp_plant,
      set_temp_plant,
      on_confirm,
      on_cancel,
      inventory,
    },
    ref
  ) => {
    return (
      <BottomSheetModal
        ref={ref}
        index={1}
        snapPoints={snap_points}
        onDismiss={on_cancel}
        enablePanDownToClose
        backgroundStyle={{
          backgroundColor: defaultBackground,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        handleIndicatorStyle={{ backgroundColor: COLORS.leafy_green1 }}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
          />
        )}
      >
        <BottomSheetView className="flex-1 py-5 px-1">
          <Text className="text-xl font-bold text-center text-gray-600">
            Plant a Seed
          </Text>

          <View className="mt-4">
            <Text className="text-lg font-semibold text-gray-600 ml-4">
              Ready to plant something?
            </Text>
            <Text className="text-base text-gray-600 opacity-80 ml-4">
              Choose from your available seeds to plant!
            </Text>
          </View>

          {available_seeds.length > 0 ? (
            <FlatList
              data={available_seeds}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => set_temp_plant(item)}>
                  <PlantCard
                    plant={item}
                    variant="seeds"
                    show_add_button={false}
                    is_active={temp_plant?.id === item.id}
                    inventory_count={inventory[item.id]}
                  />
                </TouchableOpacity>
              )}
            />
          ) : (
            <View className="flex-1 justify-center items-center py-16">
              <Text className="text-center text-gray-500 text-lg">
                No seeds available!
              </Text>
              <Text className="text-center text-gray-400 text-sm mt-2">
                Visit the Shop to buy seeds first.
              </Text>
            </View>
          )}

          <View className="flex-row item-center justify-center gap-6 mt-3">
            <TouchableOpacity
              className="w-5/12 rounded-3xl py-3"
              style={{ backgroundColor: COLORS.gray300 }}
              onPress={on_cancel}
            >
              <Text className="text-center text-gray-500 text-lg font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-5/12 rounded-3xl py-3"
              style={{
                backgroundColor:
                  temp_plant && available_seeds.length > 0
                    ? COLORS.leafy_green2
                    : COLORS.gray300,
                opacity: temp_plant && available_seeds.length > 0 ? 1 : 0.6,
              }}
              onPress={on_confirm}
              disabled={!temp_plant || available_seeds.length === 0}
            >
              <Text className="text-center text-white text-lg font-semibold">
                Plant Seed
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default AddPlantBottomSheet;
