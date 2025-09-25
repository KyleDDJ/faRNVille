import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import EarningsSummary from "@/components/EarningSummary";
import PlantCard from "@/components/PlantCard";
import { COLORS, defaultBackground } from "@/constants/Colors";
import { PLANTS } from "@/constants/Plant";
import { Plants } from "@/entities/plant.entities";

const ShopScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selected_plant, setSelectedPlant] = useState<Plants | null>(null);
  const [number, onChangeNumber] = React.useState("");
  const handleAddPlant = (plant: Plants) => {
    setSelectedPlant(plant);
    handleOpen();
  };
  const snapPoints = useMemo(() => ["20%"], []);

  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
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

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={true}
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
                  <TextInput
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
                    defaultValue="1"
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
                  console.log("Bought", selected_plant.name, "x" + number);
                  handleClose();
                }}
              >
                <Text className="text-center text-white font-semibold text-lg">
                  Buy
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
