import AddPlantButton from "@/components/AddPlantButton";
import EarningSummary from "@/components/EarningSummary";
import PlantCard from "@/components/PlantCard";
import { COLORS, defaultBackground } from "@/constants/Colors";
import { PLANTS } from "@/constants/Plant";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef } from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FarmScreen: React.FC = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const snapPoints = useMemo(() => ["70%"], []);

  const handleOpen = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleClose = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  return (
    <SafeAreaView
      className="flex-1"
      style={{
        backgroundColor: defaultBackground,
      }}
    >
      <EarningSummary />

      <View style={{ paddingTop: 16, alignItems: "center" }}>
        <AddPlantButton title="Add a Plant" onPress={handleOpen} />
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
        <BottomSheetView className="flex-1 px- py-2.5">
          <Text className="text-center text-xl font-bold text-black">
            Add a New Plant 🌱
          </Text>

          <View className="mt-4">
            <Text className="text-lg font-semibold text-black ml-4">
              Ready to plant something?
            </Text>
            <Text className="text-basetext-black opacity-80 ml-4">
              Choose your seed from the shop and start farming!
            </Text>
          </View>

          <FlatList
            data={PLANTS}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => console.log("Pressed:", item.name)}
              >
                <PlantCard plant={item} variant="seeds" showAddButton={false} />
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
          />

          <View className="flex-row item-center justify-center gap-6">
            <TouchableOpacity
              className="w-5/12 rounded-lg py-3"
              style={{ backgroundColor: COLORS.gray500 }}
              onPress={handleClose}
            >
              <Text className="text-center text-white text-lg font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="w-5/12 rounded-lg py-3"
              style={{ backgroundColor: COLORS.leafy_green1 }}
              onPress={() => console.log("Plant added!")}
            >
              <Text className="text-center text-white text-lg font-semibold">
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default FarmScreen;
