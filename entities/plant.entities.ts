export type Plants = {
  id: number;
  name: string;
  harvestTime: string;
  stock: string;
  profit: number;
  cost: number;
  status?: 'available' | 'planted' | 'growing' | 'ready' | 'harvested';
  category?: 'vegetable' | 'fruit';
  image?: any;
  plantedAt?: Date;
  harvestReadyAt?: Date;
};
