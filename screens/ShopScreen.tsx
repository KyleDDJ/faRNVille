import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetTextInput,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EarningsSummary from "@/components/EarningSummary";
import PlantCard from "@/components/PlantCard";
import { COLORS, defaultBackground } from "@/constants/Colors";
import { PLANTS } from "@/constants/Plant";
import { Plants } from "@/entities/plant.entities";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const ShopScreen = () => {
  const [selected_plant, setSelectedPlant] = useState<Plants | null>(null);
  const [number, onChangeNumber] = React.useState("1");
  const [confirmation_modal_visible, setConfirmationModalVisible] =
    useState(false);
  const [purchase_info, setPurchaseInfo] = useState<{
    name: string;
    count: string;
    cost: number;
  } | null>(null);
  const [success_modal_visible, setSuccessModalVisible] = useState(false);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const handleAddPlant = (plant: Plants) => {
    setSelectedPlant(plant);
    onChangeNumber("1");
    handleOpen();
  };
  const snapPoints = useMemo(() => ["20%"], []);

  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
    onChangeNumber("1");
  }, []);

  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: defaultBackground }}
    >
      <EarningsSummary />
      <View className="flex-1 pt-6 pb-16">
        <FlatList
          data={PLANTS}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <PlantCard plant={item} onAdd={handleAddPlant} variant="shop" />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 64 }}
        />
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={confirmation_modal_visible}
        onRequestClose={() => setConfirmationModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-5 w-9/12 items-center">
            <View className="mb-2">
              <MaterialCommunityIcons
                name="archive-plus"
                size={50}
                color={COLORS.lightgreen}
              />
            </View>

            <Text className="text-lg font-bold mb-4 text-center">
              {purchase_info
                ? `Confirm ${purchase_info.count} ${purchase_info.name}(s) for $${purchase_info.cost}?`
                : ""}
            </Text>

            <View className="flex-row gap-5 justify-between items-center">
              <Pressable
                style={{ backgroundColor: COLORS.gray300 }}
                className="px-10 py-3 rounded-full"
                onPress={() => setConfirmationModalVisible(false)}
              >
                <Text className="font-semibold text-black">Cancel</Text>
              </Pressable>
              <Pressable
                style={{ backgroundColor: COLORS.lightgreen }}
                className="px-10 py-3 rounded-full"
                onPress={() => {
                  console.log("Confirmed purchase:", purchase_info);
                  setConfirmationModalVisible(false);
                  setSuccessModalVisible(true);
                }}
              >
                <Text className="text-white font-semibold">Confirm</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={success_modal_visible}
        onRequestClose={() => setSuccessModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl pt-5 pb-4 px-5 w-9/12 items-center">
            <View className="mb-2">
              <MaterialCommunityIcons
                name="leaf-circle"
                size={48}
                color={COLORS.lightgreen}
              />
            </View>

            <Text className="text-lg font-bold mb-4 text-center">
              {purchase_info
                ? `You purchased ${purchase_info.count} ${purchase_info.name}(s)!`
                : ""}
            </Text>

            <Pressable
              style={{ backgroundColor: COLORS.lightgreen }}
              className="w-full py-3 rounded-full"
              onPress={() => setSuccessModalVisible(false)}
            >
              <Text className="text-white font-semibold text-center">
                Accept
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
        keyboardBehavior="interactive"
        keyboardBlurBehavior="restore"
        onDismiss={() => {
          onChangeNumber("0");
          setSelectedPlant(null);
        }}
        backgroundStyle={{
          backgroundColor: defaultBackground,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}
        handleIndicatorStyle={{
          backgroundColor: COLORS.leafy_green1,
        }}
        backdropComponent={props => (
          <BottomSheetBackdrop
            {...props}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
            opacity={0.5}
          />
        )}
      >
        <BottomSheetView className="flex-1 py-2.5 px-4">
          {selected_plant ? (
            <View className="items-center">
              <Text className="text-xl font-bold text-black">
                Buying {selected_plant.name}
              </Text>

              <View className="flex-row items-center mt-5 w-full gap-5 justify-between">
                <View className="flex-row items-center">
                  <Text className="mr-2 text-black text-2xl font-bold">
                    Amount:
                  </Text>
                  <BottomSheetTextInput
                    style={{
                      borderWidth: 1,
                      borderColor: COLORS.gray300,
                      paddingVertical: 8,
                      borderRadius: 8,
                      width: 100,
                      textAlign: "center",
                    }}
                    onChangeText={onChangeNumber}
                    keyboardType="numeric"
                    value={number}
                  />
                </View>

                <Text className="text-black text-2xl  font-bold">
                  Cost: ${selected_plant.cost * Number(number)}.00
                </Text>
              </View>
              <TouchableOpacity
                className="w-full mt-6 py-3 rounded-3xl"
                style={{ backgroundColor: COLORS.green }}
                onPress={() => {
                  if (!selected_plant) return;

                  setPurchaseInfo({
                    name: selected_plant.name,
                    count: number,
                    cost: selected_plant.cost * Number(number),
                  });

                  handleClose();
                  setConfirmationModalVisible(true);
                }}
              >
                <Text className="text-center text-white font-semibold text-lg">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <Text className="text-center text-lg">No plant selected</Text>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default ShopScreen;
