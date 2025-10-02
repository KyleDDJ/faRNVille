export type Plants = {
  id: number;
  name: string;
  harvest_time: string;
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

export interface HarvestInfo {
  name: string;
  profit: number;
}
