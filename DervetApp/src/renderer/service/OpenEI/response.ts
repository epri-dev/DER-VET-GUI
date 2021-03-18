export enum Sector {
  Residential = 'Residential',
  Commercial = 'Commercial',
  Industrial = 'Industrial',
  Lighting = 'Lighting',
}

export interface RateStructureItem {
  adj?: number;
  max?: number;
  rate: number;
  unit?: string;
}

// Optional fields are returned when query parameter "detail" is set to "full"
export interface UtilityRate {
  approved: boolean;
  country: string;
  demandratestructure?: RateStructureItem[][];
  demandweekdayschedule?: number[][];
  demandweekendschedule?: number[][];
  demandrateunit?: string;
  demandunits?: string;
  description: string;
  eiaid: number;
  enddate: number;
  energyattrs?: any[]; // TODO LL what to do when object keys are variable?
  energycomments?: string;
  energyratestructure?: RateStructureItem[][];
  energyweekdayschedule?: number[][];
  energyweekendschedule?: number[][];
  flatdemandunit?: string;
  label: string;
  name: string;
  revisions: number[];
  source: string;
  sector: Sector;
  sourceparent: string;
  startdate: number;
  uri: string;
  utility: string;
}

export interface UtilityRatesData {
  items: UtilityRate[];
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

export interface UtilityCompaniesData {
  items: UtilityCompanyItem[];
  properties: object;
}

export interface UtilityCompaniesResponse {
  data: UtilityCompaniesData;
  status: number;
  statusText: string;
}

export default UtilityRate;
