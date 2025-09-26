import { PLANTS } from "@/constants/Plant";
import { Plants } from "@/entities/plant.entities";
import React, { createContext, useContext, useState } from "react";

type PlantsContextType = {
  plants: Plants[];
  inventory: { [id: number]: number };
  buyPlant: (plantId: number, amount: number) => void;
};

const PlantsContext = createContext<PlantsContextType | undefined>(undefined);

export const PlantsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [plants] = useState<Plants[]>(PLANTS);
  const [inventory, setInventory] = useState<{ [id: number]: number }>({});

  const buyPlant = (plantId: number, amount: number) => {
    console.log("Buying plant:", plantId, "amount:", amount);

    setInventory(prev => {
      console.log("Inventory BEFORE:", prev);

      const updated = {
        ...prev,
        [plantId]: (prev[plantId] || 0) + amount,
      };

      console.log("Inventory AFTER:", updated);

      return updated;
    });
  };

  return (
    <PlantsContext.Provider value={{ plants, inventory, buyPlant }}>
      {children}
    </PlantsContext.Provider>
  );
};

export const usePlants = () => {
  const ctx = useContext(PlantsContext);
  if (!ctx) throw new Error("usePlants must be used inside PlantsProvider");
  return ctx;
};
