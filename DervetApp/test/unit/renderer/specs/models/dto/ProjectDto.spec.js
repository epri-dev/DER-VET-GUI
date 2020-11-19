import {
  makeBaseKey,
  makeBatteryCycleLifeCsv,
  makeBatteryParameters,
  makeCsvs,
  makeDAParameters,
  makeDCMParameters,
  makeDeferralParameters,
  makeDieselGensetParameters,
  makeFinanceParameters,
  makeFRParameters,
  makeICEParameters,
  makeModelParameters,
  makeNSRParameters,
  makePVParameters,
  makeDatetimeIndex,
  makeReliabilityParameters,
  makeResultsParameters,
  makeRetailTimeShiftParameters,
  makeScenarioParameters,
  makeSRParameters,
  makeUserParameters,
  makeTimeSeriesCsv,
} from '@/models/dto/ProjectDto';

import { projectFixture } from '@/assets/samples/projectFixture.js';
import { projectFixtureAllActive } from '@/assets/samples/projectFixture-everythingActive.js';
import modelParametersFixture from '../../../../fixtures/case0/000-DA_battery_month.json';
// import mpEverythingFixture from '../../../../fixtures/000-000-everything_active.json';

describe('modelParametersDto', () => {
  const actualFullMP = makeModelParameters(projectFixture);
  xit('should have translated the name correctly', () => {
    expect(actualFullMP.name).to.eql(modelParametersFixture.name);
  });
  xit('should have transla.ed the type correctly', () => {
    expect(actualFullMP.type).to.eql(modelParametersFixture.type);
  });
  const tagFixture = modelParametersFixture.tags;
  const actualTags = actualFullMP.tags;
  xit('should have translated the battery parameters correctly', () => {
    expect(actualTags.Battery).to.eql(tagFixture.Battery);
  });
  xit('should have translated the DA parameters correctly', () => {
    expect(actualTags.DA).to.eql(tagFixture.DA);
  });
  xit('should have translated the DCM parameters correctly', () => {
    expect(actualTags.DCM).to.eql(tagFixture.DCM);
  });
  xit('should have translated the deferral parameters correctly', () => {
    expect(actualTags.Deferral).to.eql(tagFixture.Deferral);
  });
  xit('should have translated the diesel genset parameters correctly', () => {
    expect(actualTags.DieselGenset).to.eql(tagFixture.DieselGenset);
  });
  xit('should have translated the finance parameters correctly', () => {
    expect(actualTags.Finance).to.eql(tagFixture.Fiance);
  });
  xit('should have translated the FR parameters correctly', () => {
    expect(actualTags.FR).to.eql(tagFixture.FR);
  });
  xit('should have translated the ICE parameters correctly', () => {
    expect(actualTags.ICE).to.eql(tagFixture.ICE);
  });
  xit('should have translated the NSR parameters correctly', () => {
    expect(actualTags.NSR).to.eql(tagFixture.NSR);
  });
  xit('should have translated the PV parameters correctly', () => {
    expect(actualTags.PV).to.eql(tagFixture.PV);
  });
  xit('should have translated the reliability parameters correctly', () => {
    expect(actualTags.Reliability).to.eql(tagFixture.Reliability);
  });
  xit('should have translated the results parameters correctly', () => {
    expect(actualTags.Results).to.eql(tagFixture.Results);
  });
  xit('should have translated the retail ETS parameters correctly', () => {
    expect(actualTags.retailTimeShift).to.eql(tagFixture.retailTimeShift);
  });
  xit('should have translated the scenario parameters correctly', () => {
    expect(actualTags.Scenario).to.eql(tagFixture.Scenario);
  });
  xit('should have translated the SR parameters correctly', () => {
    expect(actualTags.SR).to.eql(tagFixture.SR);
  });
  xit('should have translated the user defined parameters correctly', () => {
    expect(actualTags.User).to.eql(tagFixture.User);
  });
  it('should translate a Project object into a ModelParameters object', () => {
    expect(actualFullMP).to.eql(modelParametersFixture);
  });

  it('should create an object containing CSVs needed to run DERVET', () => {
    const actual = makeCsvs(projectFixture);
    expect(actual.length).to.eql(5);
  });

  it('should create a CSV containing battery cycle life data', () => {
    const actual = makeBatteryCycleLifeCsv(projectFixture);
    expect(actual).to.have.string('0.05,75000');
    expect(actual).to.have.string('Cycle Depth Upper Limit');
  });

  it('should create a CSV containing timeseries data', () => {
    const actual = makeTimeSeriesCsv(projectFixture);
    expect(actual).to.have.string('Datetime (he)');
  });

  it('should generate a datetime index given a data year and timestep', () => {
    const actualLeap = makeDatetimeIndex(2020);
    const actualNonLeap = makeDatetimeIndex(2021);
    expect(actualLeap.length).to.equal(8784);
    expect(actualNonLeap.length).to.equal(8760);
    expect(actualLeap[0]).to.equal('1/1/2020 1:00');
    expect(actualLeap[actualLeap.length - 1]).to.equal('1/1/2021 0:00');
    expect(actualLeap[1609]).to.equal('3/8/2020 2:00'); // No daylight savings jumps
  });

  it('should make battery parameters', () => {
    const actual = makeBatteryParameters(projectFixture);
    expect(Object.keys(actual[''].keys).length).to.eql(51);
  });

  it('should make DA parameters', () => {
    const actual = makeDAParameters(projectFixture);
    expect(Object.keys(actual[''].keys).length).to.eql(1);
  });
  it('should make DCM parameters', () => {
    const actual = makeDCMParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(1);
  });
  it('should make deferral parameters', () => {
    const actual = makeDeferralParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(5);
  });
  it('should make diesel genset parameters', () => {
    const actual = makeDieselGensetParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(27);
  });
  it('should make finance parameters', () => {
    const actual = makeFinanceParameters(projectFixture);
    expect(Object.keys(actual[''].keys).length).to.eql(10);
  });
  it('should make FR parameters', () => {
    const actual = makeFRParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(8);
  });
  it('should make ICE parameters', () => {
    const actual = makeICEParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(27);
  });
  it('should make NSR parameters', () => {
    const actual = makeNSRParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(3);
  });
  it('should make PV parameters', () => {
    const actual = makePVParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(31);
  });
  it('should make reliability parameters', () => {
    const actual = makeReliabilityParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(5);
  });
  it('should make results parameters', () => {
    const actual = makeResultsParameters(projectFixture);
    expect(Object.keys(actual[''].keys).length).to.eql(3);
  });
  it('should make retail ETS parameters', () => {
    const actual = makeRetailTimeShiftParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(1);
  });
  it('should make scenario parameters', () => {
    const actual = makeScenarioParameters(projectFixture);
    expect(Object.keys(actual[''].keys).length).to.eql(25);
  });
  it('should make SR parameters', () => {
    const actual = makeSRParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(3);
  });
  it('should make user defined parameters', () => {
    const actual = makeUserParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(1);
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
