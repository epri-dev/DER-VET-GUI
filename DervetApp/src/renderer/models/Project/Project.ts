export interface Project {
  name: string;
  schemaVersion: string;
  objectivesDA: boolean;
  tsDaPrice: number[];
  fuelPriceGas: number;
  fuelPriceLiquid: number;
  fuelPriceOther: number;
}
