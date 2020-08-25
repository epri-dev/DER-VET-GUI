import { sharedDefaults, sharedValidation } from './Shared.js';

const defaults = {
  id: '',
  name: '',
  energyCapacity: 0,
  powerCapacity: 0,
  shouldEnergySize: true,
  shouldPowerSize: true,
  shouldMaxDuration: false,
  shouldDiffChargeDischarge: false,
  chargingCapacity: 0,
  dischargingCapacity: 0,
  maxDuration: 0,
  roundtripEfficiency: 0,
  upperSOCLimit: 100,
  targetSOC: 0,
  lowerSOCLimit: 0,
  selfDischargeRate: 0,
  shouldLimitDailyCycling: false,
  dailyCycleLimit: 0.0,
  calendarDegradationRate: 0,
  includeCycleDegradation: false,
  batteryCycles: [
    { ulimit: 0.05, val: 75000 },
    { ulimit: 0.1, val: 40500 },
  ],
  includeAuxiliaryLoad: false,
  auxiliaryLoad: 0.0,
  includeStartupCost: false,
  capitalCost: 0,
  capitalCostPerkW: 0,
  capitalCostPerkWh: 0,
  variableOMCosts: 0,
  fixedOMCosts: 0,
  endOfLifeExpenses: 0,
  constructionDate: '',
  operationDate: '',
  macrsTerm: sharedDefaults.macrsTerm,
};

const validation = {
  macrsTerm: sharedValidation.macrsTerm,
};

export default {
  defaults,
  validation,
};
