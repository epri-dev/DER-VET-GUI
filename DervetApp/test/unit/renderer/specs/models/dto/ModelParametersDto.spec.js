import {
  makeBaseKey,
  makeBatteryCycleLifeCsv,
  makeBatteryParameters,
  makeCsvs,
  makeDAParameters,
  makeDatetimeIndex,
  makeFinanceParameters,
  makeModelParameters,
  makeScenarioParameters,
  makeTimeSeriesCsv,
} from '@/models/dto/ModelParametersDto';

import modelParametersFixture from '../../../fixtures/case0/000-DA_battery_month.json';

// TODO move to fixtures
const project = {
  analysisHorizon: 0,
  analysisHorizonMode: '1',
  daGrowth: 0,
  dataYear: 2017,
  discountRate: 7,
  deferralGrowth: 2,
  externalIncentives: [],
  federalTaxRate: 3,
  gridLocation: 'Customer',
  inflationRate: 3,
  inputsDirectory: '/path/to/inputs',
  objectivesDA: true,
  optimizationHorizon: 'month',
  ownership: 'Customer',
  propertyTaxRate: 3,
  retailTariffBillingPeriods: [{
    id: 1,
    startMonth: 1,
    endMonth: 12,
    startTime: 1,
    endTime: 24,
    excludingStartTime: null,
    excludingEndTime: null,
    weekday: 2,
    value: 0.47,
    chargeType: 'Energy',
    name: '',
  }],
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
};

describe('modelParametersDto', () => {
  it('should translate a Project object into a ModelParameters object', () => {
    const actual = makeModelParameters(project);
    expect(actual).to.eql(modelParametersFixture);
  });

  it('should create an object containing CSVs needed to run DERVET', () => {
    const actual = makeCsvs(project);
    const expected = ['batteryCycleLife', 'customerTariff', 'yearlyData', 'monthlyData', 'timeSeriesData'];
    expect(Object.keys(actual)).to.eql(expected);
  });

  it('should create a CSV containing battery cycle life data', () => {
    const actual = makeBatteryCycleLifeCsv(project);
    expect(actual).to.have.string('0.05,75000');
    expect(actual).to.have.string('Cycle Depth Upper Limit');
  });

  it('should create a CSV containing timeseries data', () => {
    const actual = makeTimeSeriesCsv(project);
    expect(actual).to.have.string('Datetime (he)');
  });

  it('should generate a datetime index given a data year and timestep', () => {
    const actualLeap = makeDatetimeIndex(2020);
    const actualNonLeap = makeDatetimeIndex(2021);
    expect(actualLeap.length).to.equal(8784);
    expect(actualNonLeap.length).to.equal(8760);
  });

  it('should make battery parameters', () => {
    const actual = makeBatteryParameters(project);
    expect(Object.keys(actual[''].keys).length).to.eql(49);
  });

  it('should make DA parameters', () => {
    const actual = makeDAParameters(project);
    expect(Object.keys(actual[''].keys).length).to.eql(1);
  });

  it('should make finance parameters', () => {
    const actual = makeFinanceParameters(project);
    expect(Object.keys(actual[''].keys).length).to.eql(9);
  });

  it('should make scenario parameters', () => {
    const actual = makeScenarioParameters(project);
    expect(Object.keys(actual[''].keys).length).to.eql(25);
  });

  it('should make a base key value given a value and type', () => {
    const actual = makeBaseKey('1', 'int');
    const expected = {
      opt_value: '1',
      sensitivity: {
        active: 'no',
        coupled: 'None',
        value: 'nan',
      },
      type: 'int',
    };
    expect(actual).to.eql(expected);
  });
});
