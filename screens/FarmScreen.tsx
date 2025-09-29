import AddPlantBottomSheet from "@/components/AddPlantBottomSHeet";
import AddPlantButton from "@/components/AddPlantButton";
import EarningSummary from "@/components/EarningsSummary";
import FarmingSummaryCard from "@/components/FarmingSummary";
import HarvestModal from "@/components/HarvestModal";
import NoPlantView from "@/components/NoPlantView";
import RemovePlantBottomSheet from "@/components/RemovePlantBottomSheet";
import { defaultBackground } from "@/constants/Colors";
import { PLANTS } from "@/constants/Plant";
import { usePlants } from "@/contexts/PlantsContext";
import { Plants } from "@/entities/plant.entities";
import FarmDashboard from "@/screens/FarmDashboard";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const FarmScreen: React.FC = () => {
  const {
    inventory,
    planted_plants,
    plantSeed: plantSeed,
    harvestPlant: harvestPlant,
    removePlant: removePlant,
  } = usePlants();

  const addPlantSheetRef = useRef<BottomSheetModal>(null);
  const removePlantSheetRef = useRef<BottomSheetModal>(null);

  const [temp_plant, setTempPlant] = useState<any>(null);
  const [plant_to_remove, setPlantToRemove] = useState<any>(null);
  const [show_harvest_modal, setShowHarvestModal] = useState(false);
  const [harvest_info, setHarvestInfo] = useState<{
    name: string;
    profit: string;
  } | null>(null);
  const [plants_with_progress, setPlantsWithProgress] = useState<any[]>([]);

  const addPlantSnapPoints = useMemo(() => ["26%", "65%"], []);
  const removePlantSnapPoints = useMemo(() => ["25%"], []);

  const availableSeeds = PLANTS.filter(
    plant => inventory[plant.id] && inventory[plant.id] > 0
  ).map(plant => ({
    ...plant,
    stock: `${inventory[plant.id]} seeds available`,
  }));

  useEffect(() => {
    const interval = setInterval(() => {
      const updatedPlants = planted_plants.map(plant => {
        const now = new Date().getTime();
        const plantedTime = new Date(plant.planted_at).getTime();
        const harvestTime = new Date(plant.harvest_ready_at).getTime();

        const totalGrowthTime = harvestTime - plantedTime;
        const elapsedTime = now - plantedTime;
        const progress = Math.min(elapsedTime / totalGrowthTime, 1);

        let timeLeft = "Ready!";
        if (progress < 1) {
          const remainingMs = harvestTime - now;
          const minutes = Math.floor(remainingMs / 60000);
          const seconds = Math.floor((remainingMs % 60000) / 1000);
          timeLeft = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
        }

        return {
          ...plant,
          progress,
          time_left: timeLeft,
        };
      });

      setPlantsWithProgress(updatedPlants);
    }, 1000);

    return () => clearInterval(interval);
  }, [planted_plants]);

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
      const success = plantSeed(temp_plant.id);
      if (success) {
        handleCloseAddPlant();
      }
    }
  }, [temp_plant, plantSeed, handleCloseAddPlant]);

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
      removePlant(plant_to_remove.unique_id);
      handleCloseRemovePlant();
    }
  }, [plant_to_remove, removePlant]);

  const handleHarvest = useCallback(
    (plant: Plants & { unique_id: number }) => {
      harvestPlant(plant.unique_id);

      setHarvestInfo({
        name: plant.name,
        profit: `$${plant.profit.toFixed(2)}`,
      });

      setShowHarvestModal(true);
    },
    [harvestPlant]
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: defaultBackground }}>
      <EarningSummary />

      <FarmingSummaryCard />

      {plants_with_progress.length > 0 ? (
        <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
          {plants_with_progress.map(plant => (
            <FarmDashboard
              key={plant.unique_id}
              plant={plant}
              progress={plant.progress}
              time_left={plant.time_left}
              on_remove={() => handleOpenRemovePlant(plant)}
              on_harvest={() => handleHarvest(plant)}
            />
          ))}

          <TouchableOpacity className="mt-4">
            <AddPlantButton
              title="Add a Plant again"
              on_press={handleOpenAddPlant}
            />
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <NoPlantView on_add={handleOpenAddPlant} />
      )}

      <HarvestModal
        visible={show_harvest_modal}
        info={harvest_info}
        on_close={() => setShowHarvestModal(false)}
      />

      <AddPlantBottomSheet
        ref={addPlantSheetRef}
        snap_points={addPlantSnapPoints}
        available_seeds={availableSeeds}
        temp_plant={temp_plant}
        set_temp_plant={setTempPlant}
        on_confirm={handleConfirmAdd}
        on_cancel={handleCloseAddPlant}
        inventory={inventory}
      />

      <RemovePlantBottomSheet
        ref={removePlantSheetRef}
        snap_points={removePlantSnapPoints}
        plant_to_remove={plant_to_remove}
        on_confirm={handleConfirmRemove}
        on_cancel={handleCloseRemovePlant}
      />
    </SafeAreaView>
  );
};

export default FarmScreen;
