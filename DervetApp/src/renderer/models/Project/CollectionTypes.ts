// TODO split into technology/financial?
enum CollectionTypes {
  Project = 'Project',
  Battery = 'technologySpecsBattery',
  ControllableLoad = 'technologySpecsControllableLoad',
  DieselGen = 'technologySpecsDieselGen',
  FleetEV = 'technologySpecsFleetEV',
  ICE = 'technologySpecsICE',
  SingleEV = 'technologySpecsSingleEV',
  SolarPV = 'technologySpecsSolarPV',
  ExternalIncentive = 'externalIncentives',
  RetailTariff = 'retailTariffBillingPeriods',
}

export default CollectionTypes;
