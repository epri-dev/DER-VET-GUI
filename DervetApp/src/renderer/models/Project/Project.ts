export interface Project {
  name: string;
  schemaVersion: string;
  storeType: string;
  objectivesDA: boolean;
  tsDaPrice: number[];
  fuelPriceGas: number;
  fuelPriceLiquid: number;
  fuelPriceOther: number;
}
