import { sharedDefaults, sharedValidation } from './Shared.js';

const defaults = {
  active: false,
  auxiliaryLoad: 0.0,
  batteryCycles: [
    { ulimit: 0.05, val: 75000 },
    { ulimit: 0.1, val: 40500 },
    { ulimit: 0.15, val: 27000 },
    { ulimit: 0.2, val: 20250 },
    { ulimit: 0.3, val: 11250 },
    { ulimit: 0.4, val: 6750 },
    { ulimit: 0.5, val: 4500 },
    { ulimit: 0.6, val: 3750 },
    { ulimit: 0.7, val: 3225 },
    { ulimit: 0.8, val: 2813 },
    { ulimit: 0.9, val: 2475 },
    { ulimit: 1, val: 2250 },
  ],
  calendarDegradationRate: 0,
  capitalCost: 0,
  capitalCostPerkW: 0,
  capitalCostPerkWh: 0,
  chargingCapacity: 0,
  constructionDate: '',
  dailyCycleLimit: 0.0,
  dischargingCapacity: 0,
  endOfLifeExpenses: 0,
  energyCapacity: 0,
  fixedOMCosts: 0,
  name: '',
  id: '',
  includeAuxiliaryLoad: false,
  includeCycleDegradation: false,
  includeStartupCost: false,
  lowerSOCLimit: 0,
  macrsTerm: sharedDefaults.macrsTerm,
  maxDuration: 0,
  operationDate: '',
  powerCapacity: 0,
  roundtripEfficiency: 0,
  selfDischargeRate: 0,
  shouldDiffChargeDischarge: false,
  shouldEnergySize: true,
  shouldLimitDailyCycling: false,
  shouldMaxDuration: false,
  shouldPowerSize: true,
  tag: 'Battery',
  targetSOC: 0,
  technologyType: 'Energy Storage System',
  upperSOCLimit: 100,
  variableOMCosts: 0,
};

const validation = {
  macrsTerm: sharedValidation.macrsTerm,
};

export default {
  defaults,
  validation,
};
