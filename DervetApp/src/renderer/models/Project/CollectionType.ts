// TODO remove eventually
export enum Project {
  Project = 'Project'
}

export enum Technology {
  Battery = 'technologySpecsBattery',
  ControllableLoad = 'technologySpecsControllableLoad',
  DieselGen = 'technologySpecsDieselGen',
  FleetEV = 'technologySpecsFleetEV',
  ICE = 'technologySpecsICE',
  SingleEV = 'technologySpecsSingleEV',
  SolarPV = 'technologySpecsSolarPV',
}

export enum Financial {
  ExternalIncentive = 'externalIncentives',
  RetailTariff = 'retailTariffBillingPeriods',
}

export const CollectionType = { ...Project, ...Technology, ...Financial };
export type CollectionType = Project | Technology | Financial; // eslint-disable-line
