import { PLANTS } from "@/constants/Plant";
import { Plants } from "@/entities/plant.entities";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type PlantedPlant = Plants & {
  unique_id: number;
  planted_at: Date;
  harvest_ready_at: Date;
};

type PlantsContextType = {
  plants: Plants[];
  inventory: { [id: number]: number };
  planted_plants: PlantedPlant[];
  money: number;
  buyPlant: (plant_id: number, amount: number) => boolean;
  canAfford: (cost: number) => boolean;
  plantSeed: (plant_id: number) => boolean;
  harvestPlant: (unique_id: number) => void;
  removePlant: (unique_id: number) => void;
};

const PlantsContext = createContext<PlantsContextType | undefined>(undefined);

const STORAGE_KEYS = {
  MONEY: "@farm_money",
  INVENTORY: "@farm_inventory",
  PLANTED_PLANTS: "@farm_planted_plants",
};

export const PlantsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [plants] = useState<Plants[]>(PLANTS);
  const [inventory, setInventory] = useState<{ [id: number]: number }>({});
  const [planted_plants, setPlantedPlants] = useState<PlantedPlant[]>([]);
  const [money, setMoney] = useState<number>(10.0);
  const [is_loaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadPersistedData();
  }, []);

  useEffect(() => {
    if (is_loaded) {
      saveMoneyToStorage(money);
    }
  }, [money, is_loaded]);

  useEffect(() => {
    if (is_loaded) {
      saveInventoryToStorage(inventory);
    }
  }, [inventory, is_loaded]);

  useEffect(() => {
    if (is_loaded) {
      savePlantedPlantsToStorage(planted_plants);
    }
  }, [planted_plants, is_loaded]);

  const loadPersistedData = async () => {
    try {
      const savedMoney = await AsyncStorage.getItem(STORAGE_KEYS.MONEY);
      if (savedMoney !== null) {
        setMoney(parseFloat(savedMoney));
      }

      const savedInventory = await AsyncStorage.getItem(STORAGE_KEYS.INVENTORY);
      if (savedInventory !== null) {
        setInventory(JSON.parse(savedInventory));
      }

      const savedPlantedPlants = await AsyncStorage.getItem(
        STORAGE_KEYS.PLANTED_PLANTS
      );
      if (savedPlantedPlants !== null) {
        const parsedPlants = JSON.parse(savedPlantedPlants);
        const plantsWithDates = parsedPlants.map((plant: any) => ({
          ...plant,
          planted_at: new Date(plant.planted_at),
          harvest_ready_at: new Date(plant.harvest_ready_at),
        }));
        setPlantedPlants(plantsWithDates);
      }

      setIsLoaded(true);
    } catch (error) {
      console.error("Error loading persisted data:", error);
      setIsLoaded(true);
    }
  };

  const saveMoneyToStorage = async (amount: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.MONEY, amount.toString());
    } catch (error) {
      console.error("Error saving money:", error);
    }
  };

  const saveInventoryToStorage = async (inv: { [id: number]: number }) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.INVENTORY, JSON.stringify(inv));
    } catch (error) {
      console.error("Error saving inventory:", error);
    }
  };

  const savePlantedPlantsToStorage = async (plants: PlantedPlant[]) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.PLANTED_PLANTS,
        JSON.stringify(plants)
      );
    } catch (error) {
      console.error("Error saving planted plants:", error);
    }
  };

  const canAfford = (cost: number): boolean => {
    return money >= cost;
  };

  const parseHarvestTime = (harvest_time: string): number => {
    // TESTING: Always return 5 seconds (5000 milliseconds)
    return 5000;

    // Original code (commented out for testing):
    // const time = parseInt(harvest_time);
    // if (harvest_time.includes("m")) return time * 60 * 1000;
    // if (harvest_time.includes("h")) return time * 60 * 60 * 1000;
    // return time * 60 * 1000;
  };

  const buyPlant = (plant_id: number, amount: number): boolean => {
    const plant = plants.find(p => p.id === plant_id);
    if (!plant) return false;

    const totalCost = plant.cost * amount;

    if (!canAfford(totalCost)) {
      console.log(
        "Cannot afford purchase. Cost:",
        totalCost,
        "Available:",
        money
      );
      return false;
    }

    console.log(
      "Buying plant:",
      plant_id,
      "amount:",
      amount,
      "cost:",
      totalCost
    );

    setMoney(prev => {
      const newAmount = prev - totalCost;
      console.log("Money BEFORE:", prev, "AFTER:", newAmount);
      return newAmount;
    });

    setInventory(prev => {
      console.log("Inventory BEFORE:", prev);

      const updated = {
        ...prev,
        [plant_id]: (prev[plant_id] || 0) + amount,
      };

      console.log("Inventory AFTER:", updated);
      return updated;
    });

    return true;
  };

  const plantSeed = (plant_id: number): boolean => {
    const plant = plants.find(p => p.id === plant_id);
    if (!plant || !inventory[plant_id] || inventory[plant_id] <= 0) {
      return false;
    }

    setInventory(prev => ({
      ...prev,
      [plant_id]: prev[plant_id] - 1,
    }));

    const now = new Date();
    const harvestTime = parseHarvestTime(plant.harvest_time);
    const harvestReadyAt = new Date(now.getTime() + harvestTime);

    const plantedPlant: PlantedPlant = {
      ...plant,
      unique_id: Date.now() + Math.random(),
      planted_at: now,
      harvest_ready_at: harvestReadyAt,
    };

    setPlantedPlants(prev => [...prev, plantedPlant]);
    return true;
  };

  const harvestPlant = (unique_id: number) => {
    const plant = planted_plants.find(p => p.unique_id === unique_id);
    if (!plant) return;

    setMoney(prev => prev + plant.profit);

    setPlantedPlants(prev => prev.filter(p => p.unique_id !== unique_id));
  };

  const removePlant = (unique_id: number) => {
    setPlantedPlants(prev => prev.filter(p => p.unique_id !== unique_id));
  };

  if (!is_loaded) {
    return null;
  }

  return (
    <PlantsContext.Provider
      value={{
        plants,
        inventory,
        planted_plants,
        money,
        buyPlant,
        canAfford,
        plantSeed,
        harvestPlant,
        removePlant,
      }}
    >
      {children}
    </PlantsContext.Provider>
  );
};

export const usePlants = () => {
  const ctx = useContext(PlantsContext);
  if (!ctx) throw new Error("usePlants must be used inside PlantsProvider");
  return ctx;
};
