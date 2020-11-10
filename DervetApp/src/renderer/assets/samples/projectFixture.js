import _ from 'lodash';

import CriticalLoadTimeSeries from '@/models/TimeSeries/CriticalLoadTimeSeries';
import DeferralLoadTimeSeries from '@/models/TimeSeries/DeferralLoadTimeSeries';
import DAPriceTimeSeries from '@/models/TimeSeries/DAPriceTimeSeries';
import FRDownPriceTimeSeries from '@/models/TimeSeries/FRDownPriceTimeSeries';
import FRPriceTimeSeries from '@/models/TimeSeries/FRPriceTimeSeries';
import FRUpPriceTimeSeries from '@/models/TimeSeries/FRUpPriceTimeSeries';
import NSRPriceTimeSeries from '@/models/TimeSeries/NSRPriceTimeSeries';
import SRPriceTimeSeries from '@/models/TimeSeries/SRPriceTimeSeries';
import SiteLoadTimeSeries from '@/models/TimeSeries/SiteLoadTimeSeries';
import UserEnergyMaxTimeSeries from '@/models/TimeSeries/UserEnergyMaxTimeSeries';
import UserEnergyMinTimeSeries from '@/models/TimeSeries/UserEnergyMinTimeSeries';
import UserPowerMaxTimeSeries from '@/models/TimeSeries/UserPowerMaxTimeSeries';
import UserPowerMinTimeSeries from '@/models/TimeSeries/UserPowerMinTimeSeries';

import csvs from './csvs';

const INPUTS_DIRECTORY = '/path/to/inputs';

export const projectFixture = {
  analysisHorizon: 0,
  analysisHorizonMode: '1',
  criticalLoad: new CriticalLoadTimeSeries(csvs.siteLoad), // note: using hardcoded site load
  daGrowth: 0,
  daPrice: new DAPriceTimeSeries(csvs.daPrice),
  dataYear: 2017,
  discountRate: 7,
  deferralGrowth: 2,
  deferralLoad: new DeferralLoadTimeSeries(csvs.deferralLoad),
  externalIncentives: [
    {
      id: '1',
      year: 2017,
      taxCredit: 300,
      otherIncentive: 100,
    },
    {
      id: '2',
      year: 2018,
      taxCredit: 200,
      otherIncentive: 100,
    },
  ],
  federalTaxRate: 3,
  frPrice: new FRPriceTimeSeries(csvs.price),
  frUpPrice: new FRUpPriceTimeSeries(csvs.price),
  frDownPrice: new FRDownPriceTimeSeries(csvs.price),
  gridLocation: 'Customer',
  inflationRate: 3,
  inputsDirectory: INPUTS_DIRECTORY,
  nsrPrice: new NSRPriceTimeSeries(csvs.price),
  objectivesDA: true,
  optimizationHorizon: 'month',
  ownership: 'Customer',
  propertyTaxRate: 3,
  resultsDirectory: './Results/foo',
  retailTariffBillingPeriods: [
    {
      id: 1,
      startMonth: 1,
      endMonth: 5,
      startTime: 1,
      endTime: 24,
      excludingStartTime: null,
      excludingEndTime: null,
      weekday: 2,
      value: 0.05323,
      chargeType: 'Energy',
      name: '',
    },
    {
      id: 2,
      startMonth: 1,
      endMonth: 5,
      startTime: 1,
      endTime: 24,
      excludingStartTime: null,
      excludingEndTime: null,
      weekday: 2,
      value: 19.32,
      chargeType: 'Demand',
      name: '',
    },
    {
      id: 3,
      startMonth: 6,
      endMonth: 9,
      startTime: 1,
      endTime: 24,
      excludingStartTime: null,
      excludingEndTime: null,
      weekday: 2,
      value: 0.05668,
      chargeType: 'Energy',
      name: '',
    },
    {
      id: 4,
      startMonth: 6,
      endMonth: 9,
      startTime: 1,
      endTime: 24,
      excludingStartTime: null,
      excludingEndTime: null,
      weekday: 2,
      value: 7.08,
      chargeType: 'Demand',
      name: '',
    },
    {
      id: 5,
      startMonth: 10,
      endMonth: 12,
      startTime: 1,
      endTime: 24,
      excludingStartTime: null,
      excludingEndTime: null,
      weekday: 2,
      value: 0.05323,
      chargeType: 'Energy',
      name: '',
    },
    {
      id: 6,
      startMonth: 10,
      endMonth: 12,
      startTime: 1,
      endTime: 24,
      excludingStartTime: null,
      excludingEndTime: null,
      weekday: 2,
      value: 30.5,
      chargeType: 'Demand',
      name: '',
    },
  ],
  siteLoad: new SiteLoadTimeSeries(csvs.siteLoad),
  srPrice: new SRPriceTimeSeries(csvs.price),
  startYear: '2017',
  stateTaxRate: 3,
  technologySpecsBattery: [{
    active: true,
    auxiliaryLoad: 0,
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
    capitalCostPerkW: 100,
    capitalCostPerkWh: 800,
    chargingCapacity: 1000,
    constructionDate: '1/1/2017',
    dailyCycleLimit: 1,
    dischargingCapacity: 1000,
    endOfLifeExpenses: 0,
    energyCapacity: 2000,
    fixedOMCosts: 1000,
    name: 'Battery',
    id: '',
    includeAuxiliaryLoad: false,
    includeCycleDegradation: false,
    includeStartupCost: false,
    lowerSOCLimit: 0,
    macrsTerm: 3,
    maxDuration: 0,
    operationDate: '1/1/2017',
    powerCapacity: 0,
    roundtripEfficiency: 85,
    selfDischargeRate: 0,
    shouldDiffChargeDischarge: false,
    shouldEnergySize: true,
    shouldLimitDailyCycling: false,
    shouldMaxDuration: false,
    shouldPowerSize: true,
    tag: 'Battery',
    targetSOC: 50,
    technologyType: 'Energy Storage System',
    upperSOCLimit: 100,
    variableOMCosts: 0,
  }],
  userEnergyMax: new UserEnergyMaxTimeSeries(_.fill(Array(8760), 9000)),
  userEnergyMin: new UserEnergyMinTimeSeries(_.fill(Array(8760), 0)),
  userPowerMax: new UserPowerMaxTimeSeries(_.fill(Array(8760), 1900)),
  userPowerMin: new UserPowerMinTimeSeries(_.fill(Array(8760), -1900)),
};

export const getProjectFixture = (inputsDir, resultsDir) => {
  const res = _.cloneDeep(projectFixture);
  res.inputsDirectory = inputsDir;
  res.resultsDirectory = resultsDir;
  return res;
};
