import AddPlantButton from "@/components/AddPlantButton";
import EarningSummary from "@/components/EarningSummary";
import FarmingSummaryCard from "@/components/FarmingSummary";
import NoPlantView from "@/components/NoPlantView";
import PlantCard from "@/components/PlantCard";
import { COLORS, defaultBackground } from "@/constants/Colors";
import { PLANTS } from "@/constants/Plant";
import FarmDashboard from "@/screens/FarmDashboard";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FarmScreen: React.FC = () => {
  const addPlantSheetRef = useRef<BottomSheetModal>(null);
  const removePlantSheetRef = useRef<BottomSheetModal>(null);

  const [planted_plants, setPlantedPlants] = useState<any[]>([]);
  const [temp_plant, setTempPlant] = useState<any>(null);
  const [plant_to_remove, setPlantToRemove] = useState<any>(null);

  const snapPoints = useMemo(() => ["22", "65%"], []);

  const handleOpenAddPlant = useCallback(
    () => addPlantSheetRef.current?.present(),
    []
  );
  const handleCloseAddPlant = useCallback(() => {
    addPlantSheetRef.current?.dismiss();
    setTempPlant(null);
  }, []);
  const handleConfirmAdd = useCallback(() => {
    if (temp_plant) {
      setPlantedPlants(prev => [
        ...prev,
        { ...temp_plant, uniqueId: Date.now() },
      ]);
      handleCloseAddPlant();
    }
  }, [temp_plant]);

  const handleOpenRemovePlant = useCallback((plant: any) => {
    setPlantToRemove(plant);
    removePlantSheetRef.current?.present();
  }, []);
  const handleCloseRemovePlant = useCallback(() => {
    removePlantSheetRef.current?.dismiss();
    setPlantToRemove(null);
  }, []);
  const handleConfirmRemove = useCallback(() => {
    if (plant_to_remove) {
      setPlantedPlants(prev =>
        prev.filter(p => p.uniqueId !== plant_to_remove.uniqueId)
      );
      handleCloseRemovePlant();
    }
  }, [plant_to_remove]);

  const handleHarvest = useCallback((uniqueId: number) => {
    setPlantedPlants(prev => prev.filter(p => p.uniqueId !== uniqueId));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
      <EarningSummary />

      {planted_plants.length > 0 ? (
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          <FarmingSummaryCard
            sprint_name={"Farming Summary"}
            minutes_left={"15"}
            remaning_seed={5}
            possible_income={15}
            planted_plants={3}
          />
          {planted_plants.map((plant, index) => (
            <FarmDashboard
              key={plant.uniqueId}
              plant={plant}
              progress={index === 0 ? 0.2 : index === 1 ? 0.75 : 1}
              time_left={index === 0 ? "4m 20s" : index === 1 ? "1m 23s" : "0s"}
              onRemove={() => handleOpenRemovePlant(plant)}
              onHarvest={() => handleHarvest(plant.uniqueId)}
            />
          ))}

          <TouchableOpacity className="mt-4">
            <AddPlantButton
              title="Add a Plant again"
              onPress={handleOpenAddPlant}
            />
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <NoPlantView onAdd={handleOpenAddPlant} />
      )}

      <BottomSheetModal
        ref={addPlantSheetRef}
        index={1}
        snapPoints={snapPoints}
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
        <BottomSheetView className="flex-1 py-5 px-4">
          <Text className="text-xl font-bold text-center text-black">
            Add a New Plant
          </Text>

          <FlatList
            data={PLANTS}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setTempPlant(item)}
                style={{
                  backgroundColor:
                    temp_plant?.id === item.id
                      ? COLORS.leafy_green1
                      : "transparent",
                  borderRadius: 12,
                  marginVertical: 4,
                  padding: temp_plant?.id === item.id ? 2 : 0,
                }}
              >
                <PlantCard plant={item} variant="seeds" showAddButton={false} />
              </TouchableOpacity>
            )}
          />

          <View className="flex-row item-center justify-center gap-6 mt-3">
            <TouchableOpacity
              className="w-5/12 rounded-3xl py-3"
              style={{ backgroundColor: COLORS.gray400 }}
              onPress={handleCloseAddPlant}
            >
              <Text className="text-center text-white text-lg font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-5/12 rounded-3xl py-3"
              style={{ backgroundColor: COLORS.green }}
              onPress={handleConfirmAdd}
              disabled={!temp_plant}
            >
              <Text className="text-center text-white text-lg font-semibold">
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>

      <BottomSheetModal
        ref={removePlantSheetRef}
        index={0}
        snapPoints={snapPoints}
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
        <BottomSheetView className="flex-1 py-5 px-4">
          {plant_to_remove && (
            <>
              <Text
                className="text-xl font-bold text-center"
                style={{ color: COLORS.green }}
              >
                Confirm remove {plant_to_remove.name}?
              </Text>

              <View className="flex-col justify-center items-center mt-6 w-full space-y-4 px-4">
                <TouchableOpacity
                  className="rounded-3xl py-4 w-full mb-2"
                  style={{ backgroundColor: COLORS.red }}
                  onPress={handleConfirmRemove}
                >
                  <Text className="text-white font-bold text-center">
                    Remove
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  className="rounded-3xl py-4 w-full"
                  style={{ backgroundColor: COLORS.gray300 }}
                  onPress={handleCloseRemovePlant}
                >
                  <Text className="text-black font-bold text-center">
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </BottomSheetView>
      </BottomSheetModal>
    </SafeAreaView>
  );
};

export default FarmScreen;
