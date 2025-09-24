export type Plants = {
  id: number;
  name: string;
  harvestTime: string;
  stock: string;
  profit: number;
  cost: number;
  status?: 'available' | 'planted' | 'growing' | 'ready' | 'harvested';
  isActive?: boolean;
  category?: 'vegetable' | 'fruit';
  plantedAt?: Date;
  harvestReadyAt?: Date;
  harvestedAt?: Date; 
  image?: any;
  harvestTimeMinutes?: number; 
};
