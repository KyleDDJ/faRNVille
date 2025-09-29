export type Plants = {
  id: number;
  name: string;
  harvestTime: string;
  stock: string;
  profit: number;
  cost: number;
  image?: any;
};

export interface PurchaseInfo {
  name: string;
  count: string;  
  cost: number;
  plantId: number;
}