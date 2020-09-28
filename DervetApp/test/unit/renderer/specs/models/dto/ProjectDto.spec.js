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
} from '@/models/dto/ProjectDto';

import projectFixture from '../../../../fixtures/case0/projectFixture.js';
import modelParametersFixture from '../../../../fixtures/case0/000-DA_battery_month.json';

describe('modelParametersDto', () => {
  it('should translate a Project object into a ModelParameters object', () => {
    const actual = makeModelParameters(projectFixture);
    require('fs').writeFile('myjsonfile.json', JSON.stringify(actual), 'utf8');
    expect(actual).to.eql(modelParametersFixture);
  });

  it('should create an object containing CSVs needed to run DERVET', () => {
    const actual = makeCsvs(projectFixture);
    expect(actual.length).to.eql(4);
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
    expect(Object.keys(actual[''].keys).length).to.eql(49);
  });

  it('should make DA parameters', () => {
    const actual = makeDAParameters(projectFixture);
    expect(Object.keys(actual[''].keys).length).to.eql(1);
  });

  it('should make finance parameters', () => {
    const actual = makeFinanceParameters(projectFixture);
    expect(Object.keys(actual[''].keys).length).to.eql(9);
  });

  it('should make scenario parameters', () => {
    const actual = makeScenarioParameters(projectFixture);
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
