export enum Sector {
  Residential = 'Residential',
  Commercial = 'Commercial',
  Industrial = 'Industrial',
  Lighting = 'Lighting',
}

interface EnergyRateStructureItem {
  adj: number;
  max?: number;
  rate: number;
  unit: string;
}

// Optional fields are returned when query parameter "detail" is set to "full"
export interface UtilityRate {
  approved: boolean;
  country: string;
  demandrateunit?: string;
  demandunits?: string;
  description: string;
  eiaid: number;
  enddate: number;
  energycomments?: string;
  energyratestructure?: Array<Array<EnergyRateStructureItem>>;
  energyweekendschedule?: Array<Array<number>>;
  energyweekdayschedule?: Array<Array<number>>;
  flatdemandunit?: string;
  label: string;
  name: string;
  revisions: Array<number>;
  source: string;
  sector: Sector;
  sourceparent: string;
  startdate: number;
  uri: string;
  utility: string;
}

export interface UtilityRatesData {
  items: Array<UtilityRate>;
}

export interface UtilityRatesResponse {
  data: UtilityRatesData;
  status: number; // TODO HTTP status library?
  statusText: string;
}

export interface UtilityCompanyItem {
  label: string;
  uri: string;
}

export interface UtilityCompaniesResponse {
  properties: Array<any>;
  items: Array<UtilityCompanyItem>;
}

export default UtilityRate;
