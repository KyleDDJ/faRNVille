import PlantCard from "@/components/PlantCard";
import { COLORS, defaultBackground } from "@/constants/Colors";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import {
  FlatList,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface AddPlantBottomSheetProps {
  snap_points: string[];
  available_seeds: any[];
  temp_plant: any;
  set_temp_plant: (plant: any) => void;
  on_confirm: () => void;
  on_cancel: () => void;
  inventory: Record<number, number>;
}

export interface AddPlantBottomSheetRef {
  present: () => void;
  dismiss: () => void;
}

const AddPlantBottomSheet = forwardRef<
  AddPlantBottomSheetRef,
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
    const [is_web_modal_visible, setIsWebModalVisible] = useState(false);
    const bottomSheetRef = React.useRef<BottomSheetModal>(null);

    useImperativeHandle(ref, () => ({
      present: () => {
        if (Platform.OS === "web") {
          setIsWebModalVisible(true);
        } else {
          bottomSheetRef.current?.present();
        }
      },
      dismiss: () => {
        if (Platform.OS === "web") {
          setIsWebModalVisible(false);
        } else {
          bottomSheetRef.current?.dismiss();
        }
      },
    }));

    const handleCancel = () => {
      if (Platform.OS === "web") {
        setIsWebModalVisible(false);
      }
      on_cancel();
    };

    const handleConfirm = () => {
      if (Platform.OS === "web") {
        setIsWebModalVisible(false);
      }
      on_confirm();
    };

    const RenderContent = (
      <>
        <Text className="text-xl font-bold text-center text-gray-600">
          Plant a Seed
        </Text>

        <View className="mt-4 px-6 max-w-xl self-center items-center">
          <Text className="text-lg font-semibold text-gray-600">
            Ready to plant something?
          </Text>
          <Text className="text-base text-gray-600 opacity-80 mt-1 text-center">
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

        <View className="flex-row items-center justify-center gap-4 mt-3 self-center w-full px-6">
          <TouchableOpacity
            className="rounded-3xl bg-gray-300 py-3 flex-1"
            onPress={handleCancel}
          >
            <Text className="text-center text-gray-500 text-lg font-semibold">
              Cancel
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-3xl py-3 flex-1"
            style={{
              backgroundColor:
                temp_plant && available_seeds.length > 0
                  ? COLORS.leafy_green2
                  : COLORS.gray300,
              opacity: temp_plant && available_seeds.length > 0 ? 1 : 0.6,
            }}
            onPress={handleConfirm}
            disabled={!temp_plant || available_seeds.length === 0}
          >
            <Text className="text-center text-white text-lg font-semibold">
              Plant Seed
            </Text>
          </TouchableOpacity>
        </View>
      </>
    );

    if (Platform.OS === "web") {
      return (
        <Modal
          visible={is_web_modal_visible}
          transparent
          animationType="fade"
          onRequestClose={handleCancel}
        >
          <Pressable
            className="flex-1 justify-center items-center"
            style={{ backgroundColor: COLORS.shadow }}
            onPress={handleCancel}
          >
            <Pressable
              className="rounded-3xl p-6"
              style={{
                backgroundColor: defaultBackground,
                width: 600,
                maxHeight: "80%",
              }}
              onPress={e => e.stopPropagation()}
            >
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: 20 }}
              >
                {RenderContent}
              </ScrollView>
            </Pressable>
          </Pressable>
        </Modal>
      );
    }

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
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
          {RenderContent}
        </BottomSheetView>
      </BottomSheetModal>
    );
  }
);

export default AddPlantBottomSheet;
