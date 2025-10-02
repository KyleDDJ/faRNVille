import { Plants } from "@/entities/plant.entities";

export const PLANTS: Plants[] = [
  {
    id: 1,
    name: "Carrot",
    harvest_time: "5m",
    stock: "999pc remaining",
    profit: 5.0,
    cost: 3.0,
    image: require("@/assets/plants/carrot.jpg"),
  },
  {
    id: 2,
    name: "Potato",
    harvest_time: "9m",
    stock: "999pc remaining",
    profit: 9.0,
    cost: 5.0,
    image: require("@/assets/plants/potato.jpg"),
  },
  {
    id: 3,
    name: "Cabbage",
    harvest_time: "9m",
    stock: "999pc remaining",
    profit: 12.0,
    cost: 7.0,
    image: require("@/assets/plants/cabbage.jpg"),
  },
];