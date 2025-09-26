import { PLANTS } from "@/constants/Plant";
import { Plants } from "@/entities/plant.entities";
import React, { createContext, useContext, useState } from "react";

type PlantedPlant = Plants & {
  uniqueId: number;
  plantedAt: Date;
  harvestReadyAt: Date;
};

type PlantsContextType = {
  plants: Plants[];
  inventory: { [id: number]: number };
  planted_plants: PlantedPlant[];
  money: number;
  buyPlant: (plantId: number, amount: number) => boolean;
  canAfford: (cost: number) => boolean;
  plantSeed: (plantId: number) => boolean;
  harvestPlant: (uniqueId: number) => void;
  removePlant: (uniqueId: number) => void;
};

const PlantsContext = createContext<PlantsContextType | undefined>(undefined);

export const PlantsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [plants] = useState<Plants[]>(PLANTS);
  const [inventory, setInventory] = useState<{ [id: number]: number }>({});
  const [planted_plants, setPlantedPlants] = useState<PlantedPlant[]>([]);
  const [money, setMoney] = useState<number>(10.0);

  const canAfford = (cost: number): boolean => {
    return money >= cost;
  };

  const parseHarvestTime = (harvestTime: string): number => {
    const time = parseInt(harvestTime);
    if (harvestTime.includes("m")) return time * 60 * 1000;
    if (harvestTime.includes("h")) return time * 60 * 60 * 1000;
    return time * 60 * 1000;
  };

  const buyPlant = (plantId: number, amount: number): boolean => {
    const plant = plants.find(p => p.id === plantId);
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
      plantId,
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
        [plantId]: (prev[plantId] || 0) + amount,
      };

      console.log("Inventory AFTER:", updated);
      return updated;
    });

    return true;
  };

  const plantSeed = (plantId: number): boolean => {
    const plant = plants.find(p => p.id === plantId);
    if (!plant || !inventory[plantId] || inventory[plantId] <= 0) {
      return false;
    }

    setInventory(prev => ({
      ...prev,
      [plantId]: prev[plantId] - 1,
    }));

    const now = new Date();
    const harvestTime = parseHarvestTime(plant.harvestTime);
    const harvestReadyAt = new Date(now.getTime() + harvestTime);

    const plantedPlant: PlantedPlant = {
      ...plant,
      uniqueId: Date.now() + Math.random(),
      plantedAt: now,
      harvestReadyAt,
    };

    setPlantedPlants(prev => [...prev, plantedPlant]);
    return true;
  };

  const harvestPlant = (uniqueId: number) => {
    const plant = planted_plants.find(p => p.uniqueId === uniqueId);
    if (!plant) return;

    setMoney(prev => prev + plant.profit);

    setPlantedPlants(prev => prev.filter(p => p.uniqueId !== uniqueId));
  };

  const removePlant = (uniqueId: number) => {
    setPlantedPlants(prev => prev.filter(p => p.uniqueId !== uniqueId));
  };

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
