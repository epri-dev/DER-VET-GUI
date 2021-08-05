import TechnologySpecsBatteryMetadata from '@/models/Project/TechnologySpecs/TechnologySpecsBattery';
import DAPriceTimeSeries from '@/models/TimeSeries/DAPriceTimeSeries';
import FRDownPriceTimeSeries from '@/models/TimeSeries/FRDownPriceTimeSeries';
import FRUpPriceTimeSeries from '@/models/TimeSeries/FRUpPriceTimeSeries';
import FRPriceTimeSeries from '@/models/TimeSeries/FRPriceTimeSeries';
import SRPriceTimeSeries from '@/models/TimeSeries/SRPriceTimeSeries';
import {
  TECH_SPECS_BATTERY,
} from '@/router/constants';

import { daPrice, marketPrice } from '@/assets/cases/dummyMarketServiceHourly/csvs';

const defaultBatteryCyclesObject = TechnologySpecsBatteryMetadata
  .getHardcodedMetadata().getDefaultValues().associatedInputs;

export const dummyMarketServiceErrorList = {
  overview: {
    start: [],
    objectives: [],
    technologySpecs: [],
  },
  components: {
    objectives: {
      siteInformation: [],
      FR: [],
      SR: [],
      DA: [],
    },
    financial: {
      inputs: [],
      externalIncentives: [],
    },
  },
};

// TODO turn this into a function
export const dummyMarketServiceHourly = {
  analysisHorizon: 20,
  analysisHorizonMode: '1',
  tsCriticalLoad: null,
  daGrowth: 0,
  tsDaPrice: new DAPriceTimeSeries(daPrice),
  dataYear: 2017,
  financeDiscountRate: 6,
  energyPriceSourceWholesale: true,
  financeFederalTaxRate: 0,
  gridLocation: 'Generation',
  financeInflationRate: 2.2,
  name: 'Dummy Case - Market Case',
  listOfActiveServices: ['FR', 'SR'],
  objectivesBackupPower: false,
  objectivesDA: true,
  objectivesDeferral: false,
  objectivesFR: true,
  objectivesLoadFollowing: false,
  objectivesNSR: false,
  objectivesResilience: false,
  objectivesRetailDemandChargeReduction: false,
  objectivesRetailEnergyChargeReduction: false,
  objectivesSR: true,
  objectivesUserDefined: false,
  optimizationHorizon: 'Hour',
  optimizationHorizonNum: 12,
  includeSiteLoad: false,
  includeInterconnectionConstraints: false,
  maxImport: -10000000000,
  maxExport: 10000000000,
  ownership: 'Utility',
  financePropertyTaxRate: 0,
  reliabilityTarget: 1,
  reliabilityPostOptimizationOnly: true,
  reliabilityMaxOutageDuration: 24,
  retailTariffBillingPeriods: [],
  siteLoad: null,
  sizingEquipment: false,
  startYear: 2017,
  financeStateTaxRate: 0,
  technologySpecsSolarPV: [],
  technologySpecsBattery: [{
    active: true,
    associatedInputs: defaultBatteryCyclesObject,
    associatedInputsComplete: true,
    auxiliaryLoad: 0,
    calendarDegradationRate: 0,
    capitalCost: 0,
    capitalCostPerkW: 800,
    capitalCostPerkWh: 100,
    chargingCapacity: 200,
    chargingCapacityMaximum: null,
    chargingCapacityMinimum: null,
    complete: true,
    componentSpecsComplete: true,
    constructionYear: 2017,
    dailyCycleLimit: 0,
    dischargingCapacity: 200,
    dischargingCapacityMaximum: null,
    dischargingCapacityMinimum: null,
    decomissioningCost: 0,
    endOfLifeExpenses: 0,
    energyCapacity: 2000,
    energyCapacityMaximum: null,
    energyCapacityMinimum: null,
    expectedLifetime: 99,
    errorList: [],
    fixedOMCosts: 5,
    id: '024c07e1-4005-4423-99ac-6c95974ba836',
    includeAuxiliaryLoad: false,
    includeCycleDegradation: false,
    includeSizeLimits: false,
    isReplaceable: false,
    lowerSOCLimit: 0,
    macrsTerm: 3,
    maxDuration: 0,
    name: 'BESS 1',
    operationYear: 2017,
    path: TECH_SPECS_BATTERY,
    powerCapacity: 200,
    powerCapacityMaximum: null,
    powerCapacityMinimum: null,
    replacementConstructionTime: 1,
    replacementCost: 0,
    replacementCostPerkW: 100,
    replacementCostPerkWh: 800,
    roundtripEfficiency: 91,
    salvageValue: 0,
    salvageValueOption: 'User defined',
    selfDischargeRate: 0,
    shouldDiffChargeDischarge: false,
    shouldEnergySize: false,
    shouldLimitDailyCycling: false,
    shouldMaxDuration: false,
    shouldPowerSize: false,
    stateOfHealth: 0,
    tag: 'Battery',
    targetSOC: 50,
    technologyType: 'Energy Storage System',
    ter: 7,
    upperSOCLimit: 100,
    variableOMCosts: 0,
  }],
  timestep: 60,
  frEOU: 0.3,
  frEOD: 0.3,
  frGrowth: 2,
  frEnergyPriceGrowth: 5,
  frCombinedMarket: true,
  frDuration: 0,
  tsFrPrice: new FRPriceTimeSeries(marketPrice),
  tsFrUpPrice: new FRUpPriceTimeSeries(marketPrice),
  tsFrDownPrice: new FRDownPriceTimeSeries(marketPrice),
  srGrowth: 2,
  srDuration: 0,
  tsSrPrice: new SRPriceTimeSeries(marketPrice),
};

export default dummyMarketServiceHourly;