import { Plants } from "@/entities/plant.entities";

export const PLANTS: Plants[] = [
  {
    id: 1,
    name: "Carrot",
    harvestTime: "5m",
    stock: "2pc remaining",
    profit: "$5.00",
	  cost: "$3.00", 
    image: require("@/assets/plants/carrot.jpg"),
    category: "vegetable",
  },
  {
    id: 2,
    name: "Potato",
    harvestTime: "9m",
    stock: "1pc remaining",
    profit: "$9.00",
	  cost: "$5.00", 
    image: require("@/assets/plants/potato.jpg"),
    category: "vegetable",
  },
  {
    id: 3,
    name: "Cabbage",
    harvestTime: "9m",
    stock: "1pc remaining",
    profit: "$12.00",
	  cost: "$7.00", 
    image: require("@/assets/plants/cabbage.jpg"),
    category: "vegetable",
  },
];
