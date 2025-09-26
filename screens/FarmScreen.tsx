import AddPlantButton from "@/components/AddPlantButton";
import EarningSummary from "@/components/EarningSummary";
import FarmingSummaryCard from "@/components/FarmingSummary";
import NoPlantView from "@/components/NoPlantView";
import PlantCard from "@/components/PlantCard";
import { COLORS, defaultBackground } from "@/constants/Colors";
import { PLANTS } from "@/constants/Plant";
import { Plants } from "@/entities/plant.entities";
import FarmDashboard from "@/screens/FarmDashboard";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  Modal,
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
  const [show_harvest_modal, setShowHarvestModal] = useState(false);
  const [harvest_info, setHarvestInfo] = useState<{
    name: string;
    profit: string;
  } | null>(null);
  const snapPoints = useMemo(() => ["26", "65%"], []);

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

  const handleHarvest = useCallback((plant: Plants & { uniqueId: number }) => {
    setPlantedPlants(prev => prev.filter(p => p.uniqueId !== plant.uniqueId));

    setHarvestInfo({
      name: plant.name,
      profit: `$${plant.profit.toFixed(2)}`,
    });

    setShowHarvestModal(true);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
      <EarningSummary />
      <FarmingSummaryCard
        sprint_name={"Farming Summary"}
        minutes_left={"15"}
        remaning_seed={5}
        possible_income={15}
        planted_plants={3}
      />
      {planted_plants.length > 0 ? (
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {planted_plants.map((plant, index) => (
            <FarmDashboard
              key={plant.uniqueId}
              plant={plant}
              progress={index === 0 ? 0.2 : index === 1 ? 0.75 : 1}
              time_left={index === 0 ? "4m 20s" : index === 1 ? "1m 23s" : "0s"}
              onRemove={() => handleOpenRemovePlant(plant)}
              onHarvest={() => handleHarvest(plant)}
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

      <Modal visible={show_harvest_modal} transparent animationType="fade">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white rounded-2xl p-3 w-[90%] items-center">
            <View>
              <MaterialIcons
                name="trending-up"
                size={70}
                color={COLORS.lightgreen}
              />
            </View>
            <Text
              className="text-2xl font-bold mb-4"
              style={{ color: COLORS.lightgreen }}
            >
              Success!
            </Text>
            <Text className="text-center font-bold text-black mb-6">
              {harvest_info
                ? `You've earned ${harvest_info.profit} by harvesting ${harvest_info.name}!`
                : ""}
            </Text>

            <TouchableOpacity
              className="rounded-xl w-full py-4"
              style={{ backgroundColor: COLORS.leafy_green2 }}
              onPress={() => setShowHarvestModal(false)}
            >
              <Text className="text-white font-bold text-lg text-center">
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
        <BottomSheetView className="flex-1 py-5 px-1">
          <Text className="text-xl font-bold text-center text-black">
            Add a New Plant
          </Text>

          <FlatList
            data={PLANTS}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => setTempPlant(item)}>
                <PlantCard
                  plant={item}
                  variant="seeds"
                  showAddButton={false}
                  isActive={temp_plant?.id === item.id}
                />
              </TouchableOpacity>
            )}
          />

          <View className="flex-row item-center justify-center gap-6 mt-3">
            <TouchableOpacity
              className="w-5/12 rounded-3xl py-3"
              style={{ backgroundColor: COLORS.gray400 }}
              onPress={handleCloseAddPlant}
            >
              <Text className="text-center text-black text-lg font-semibold">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="w-5/12 rounded-3xl py-3"
              style={{ backgroundColor: COLORS.lightgreen }}
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
        <BottomSheetView className="flex-1 py-3 px-4">
          {plant_to_remove && (
            <>
              <View className="items-center mb-3">
                <FontAwesome6 name="trash-can" size={35} color={COLORS.red} />
              </View>
              <Text
                className="text-xl font-bold text-center"
                style={{ color: COLORS.green }}
              >
                Confirm remove {plant_to_remove.name}?
              </Text>

              <View className="flex-col justify-center items-center mt-6 w-full space-y-4 ">
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
