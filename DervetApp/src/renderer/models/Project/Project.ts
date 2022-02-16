export interface TimeSeries {
  data: number[]
}

export interface Project {
  name: string;
  schemaVersion: string;
  objectivesDA: boolean;
  tsDaPrice: TimeSeries;
}
