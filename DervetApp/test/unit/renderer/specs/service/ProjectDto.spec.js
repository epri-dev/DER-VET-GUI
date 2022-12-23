import path from 'path';

import {
  makeBackupParameters,
  makeBaseKey,
  makeBatteryCsvFilePath,
  makeBatteryCycleLifeCsv,
  makeBatteryParameters,
  makeBatteryCsvs,
  makeControllableLoadParameters,
  makeCsvs,
  makeDAParameters,
  makeDatetimeIndex,
  makeDCMParameters,
  makeDeferralParameters,
  makeDieselGensetParameters,
  makeDRParameters,
  makeFinanceParameters,
  makeFleetEVParameters,
  makeFRParameters,
  makeICEParameters,
  makeLFParameters,
  makeModelParameters,
  makeMonthlyCsv,
  makeNSRParameters,
  makePVParameters,
  makeRAParameters,
  makeReliabilityParameters,
  makeResultsParameters,
  makeRetailTimeShiftParameters,
  makeScenarioParameters,
  makeSingleEVParameters,
  makeSinglePVParameter,
  makeSRParameters,
  makeUserParameters,
  makeTimeSeriesCsv,
} from '@/service/ProjectDto';

import projectFixture from '../fixtures/models/dto/projectFixture.js';
import projectFixtureMultiplePV from '../fixtures/models/dto/projectFixtureMultiplePV.js';
import projectFixtureAllActive from '../fixtures/models/dto/projectFixture-everythingActive.js';
import modelParametersFixture from '../fixtures/models/dto/model_params_fixture.json';
import {
  makeProjectBattery,
  makeProjectControllableLoad,
  makeProjectPV,
  makeProjectFleetEV,
  makeProjectICE,
  makeProjectDieselGen,
  makeProjectSingleEV,
  testInputsDirectory,
  testResultsDirectory,
  testUuid1,
  testUuid2,
} from '../fixtures/models/dto/ProjectDtoProjectFixtures';
import {
  makeModelParamsBackup,
  makeModelParamsBattery,
  makeModelParamsControllableLoad,
  makeModelParamsDR,
  makeModelParamsElectricVehicle1,
  makeModelParamsElectricVehicle2,
  makeModelParamsPV,
  makeModelParamsIceDiesel,
  makeModelParamsLF,
  makeModelParamsRA,
  makeModelParamsResults,
} from '../fixtures/models/dto/ProjectDtoModelParamsFixtures';
import { makeTestHeader } from '../shared';

describe('Project to ModelParameters DTO', () => {
  makeTestHeader('-- Project DTO -- ');

  // TODO add a test for each pre-defined case instead of this random one
  const fullMp = makeModelParameters(projectFixture, testInputsDirectory, testResultsDirectory);

  it('should translate a Project object into a ModelParameters object', () => {
    expect(fullMp).to.eql(modelParametersFixture);
  });

  it('should create an object containing CSVs needed to run DERVET', () => {
    const actual = makeCsvs(projectFixture, testInputsDirectory);
    expect(actual.length).to.eql(6);
  });

  it('should create an object containing CSVs needed to run DERVET with multiple PV', () => {
    const actual = makeCsvs(projectFixtureMultiplePV, testInputsDirectory);
    expect(actual.length).to.eql(6);
  });

  it('should create a battery CSV file path', () => {
    const id = '3d5e9040-5433-4545-b100-bc271c600377';
    const actual = makeBatteryCsvFilePath(testInputsDirectory, id);
    expect(actual).to.equal(path.join(testInputsDirectory, `cycle_${id}.csv`));
  });

  it('should create a CSV containing battery cycle life data', () => {
    const battery = makeProjectBattery('3d5e9040-5433-4545-b100-bc271c600377');
    let actual = makeBatteryCycleLifeCsv(battery.values);
    expect(actual).to.have.string('Cycle Depth Upper Limit');
    expect(actual).to.not.have.string('0.05,75000');
    battery.values.includeCycleDegradation = true;
    actual = makeBatteryCycleLifeCsv(battery.values);
    expect(actual).to.have.string('0.05,75000');
  });

  it('should create battery cycle life csv for each battery', () => {
    const project = {
      inputsDirectory: testInputsDirectory,
      technologySpecsBattery: [
        makeProjectBattery('3d5e9040-5433-4545-b100-bc271c600377'),
        makeProjectBattery('ae4b895e-5c59-4a42-86c8-ae7388cb6ad8'),
      ],
    };
    const actual = makeBatteryCsvs(project, testInputsDirectory);
    expect(actual.length).to.equal(2);
  });

  it('should create a CSV containing timeseries data', () => {
    const actual = makeTimeSeriesCsv(projectFixture);
    expect(actual).to.have.string('Datetime (he)');
    // TODO add more details here
  });

  it('should create a CSV containing timeseries data with multiple PV columns', () => {
    const actual = makeTimeSeriesCsv(projectFixtureMultiplePV);
    expect(actual).to.have.string('Datetime (he)');
    expect(actual).to.have.string('PV Gen (kW/rated kW)/1');
    expect(actual).to.have.string('PV Gen (kW/rated kW)/2');
  });

  it('should generate a datetime index given a data year and hourly timestep', () => {
    const actualLeap = makeDatetimeIndex(2020, 60);
    const actualNonLeap = makeDatetimeIndex(2021, 60);
    expect(actualLeap.length).to.equal(8784);
    expect(actualNonLeap.length).to.equal(8760);
    expect(actualLeap[0]).to.equal('1/1/2020 1:00');
    expect(actualLeap[actualLeap.length - 1]).to.equal('1/1/2021 0:00');
    expect(actualLeap[1609]).to.equal('3/8/2020 2:00'); // No daylight savings jumps
  });

  it('should generate a datetime index given a data year and 15-minute timestep', () => {
    const actual = makeDatetimeIndex(2020, 15);
    expect(actual[0]).to.equal('1/1/2020 0:15');
    expect(actual[actual.length - 1]).to.equal('1/1/2021 0:00');
  });

  it('should generate a CSV containing monthly data', () => {
    const actual = makeMonthlyCsv(projectFixtureAllActive);
    expect(actual).to.have.string('Year');
  });

  it('should have translated the Backup parameters correctly', () => {
    const actual = makeBackupParameters(projectFixtureAllActive);
    const expected = makeModelParamsBackup;
    expect(actual).to.eql(expected);
  });

  it('should make battery parameters', () => {
    const testProject = {
      technologySpecsBattery: [
        makeProjectBattery(testUuid1),
        makeProjectBattery(testUuid2),
      ],
      inputsDirectory: testInputsDirectory,
    };

    const actual = makeBatteryParameters(testProject, testInputsDirectory);
    const expected = makeModelParamsBattery(testUuid1);
    expect(actual[testUuid1]).to.eql(expected);
    expect(Object.keys(actual)).to.eql([testUuid1, testUuid2]);
  });
  it('should make controllable load parameters', () => {
    const testProject = {
      technologySpecsControllableLoad: [
        makeProjectControllableLoad(testUuid1),
        makeProjectControllableLoad(testUuid2),
      ],
      inputsDirectory: testInputsDirectory,
    };

    const actual = makeControllableLoadParameters(testProject, testInputsDirectory);
    const expected = {
      ...makeModelParamsControllableLoad(testUuid1),
      ...makeModelParamsControllableLoad(testUuid2),
    };
    expect(actual).to.eql(expected);
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
    const testProject = {
      technologySpecsDieselGen: [
        makeProjectDieselGen(testUuid1),
        makeProjectDieselGen(testUuid2),
      ],
      inputsDirectory: testInputsDirectory,
    };
    const actual = makeDieselGensetParameters(testProject);
    const expected = {
      ...makeModelParamsIceDiesel(testUuid1),
      ...makeModelParamsIceDiesel(testUuid2),
    };

    expect(actual).to.eql(expected);
  });
  it('should have translated the DR parameters correctly', () => {
    const actual = makeDRParameters(projectFixtureAllActive);
    const expected = makeModelParamsDR;
    expect(actual).to.eql(expected);
  });
  it('should have translated the results parameters correctly', () => {
    const actual = makeResultsParameters(projectFixture, testResultsDirectory);
    const expected = makeModelParamsResults(testResultsDirectory);
    expect(actual).to.eql(expected);
  });
  it('should make elevtric vehicle 1 (single EV) parameters', () => {
    const testProject = {
      technologySpecsSingleEV: [
        makeProjectSingleEV(testUuid1),
        makeProjectSingleEV(testUuid2),
      ],
      inputsDirectory: testInputsDirectory,
    };

    const actual = makeSingleEVParameters(testProject, testInputsDirectory);
    const expected = {
      ...makeModelParamsElectricVehicle1(testUuid1),
      ...makeModelParamsElectricVehicle1(testUuid2),
    };
    expect(actual).to.eql(expected);
  });
  it('should make elevtric vehicle 2 (fleet EV) parameters', () => {
    const testProject = {
      technologySpecsFleetEV: [
        makeProjectFleetEV(testUuid1),
        makeProjectFleetEV(testUuid2),
      ],
      inputsDirectory: testInputsDirectory,
    };

    const actual = makeFleetEVParameters(testProject, testInputsDirectory);
    const expected = {
      ...makeModelParamsElectricVehicle2(testUuid1),
      ...makeModelParamsElectricVehicle2(testUuid2),
    };
    expect(actual).to.eql(expected);
  });
  it('should make finance parameters', () => {
    const actual = makeFinanceParameters(projectFixture, testInputsDirectory);
    expect(Object.keys(actual[''].keys).length).to.eql(13);
  });
  it('should make FR parameters', () => {
    const actual = makeFRParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(8);
  });
  it('should make ICE parameters', () => {
    const testProject = {
      technologySpecsICE: [
        makeProjectICE(testUuid1),
        makeProjectICE(testUuid2),
      ],
      inputsDirectory: testInputsDirectory,
    };

    const actual = makeICEParameters(testProject);
    const expected = {
      ...makeModelParamsIceDiesel(testUuid1),
      ...makeModelParamsIceDiesel(testUuid2),
    };

    expect(actual).to.eql(expected);
  });
  it('should have translated the LF parameters correctly', () => {
    const actual = makeLFParameters(projectFixtureAllActive);
    const expected = makeModelParamsLF;
    expect(actual).to.eql(expected);
  });

  it('should make NSR parameters', () => {
    const actual = makeNSRParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(3);
  });

  it('should make single PV parameter', () => {
    const actual = makeSinglePVParameter(makeProjectPV(testUuid1));
    const expected = makeModelParamsPV(testUuid1);
    expect(actual).to.eql(expected);
  });

  it('should make PV parameters', () => {
    const testProject = {
      technologySpecsSolarPV: [
        makeProjectPV(testUuid1),
        makeProjectPV(testUuid2),
      ],
    };
    const actual = makePVParameters(testProject);
    expect(Object.keys(actual)).to.eql([testUuid1, testUuid2]);
  });

  it('should have translated the RA parameters correctly', () => {
    const actual = makeRAParameters(projectFixtureAllActive);
    const expected = makeModelParamsRA;
    expect(actual).to.eql(expected);
  });

  it('should make reliability parameters', () => {
    const actual = makeReliabilityParameters(projectFixtureAllActive, testInputsDirectory);
    expect(Object.keys(actual[''].keys).length).to.eql(7);
  });

  it('should make retail ETS parameters', () => {
    const actual = makeRetailTimeShiftParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(1);
  });

  it('should make scenario parameters', () => {
    const actual = makeScenarioParameters(projectFixture, testInputsDirectory);
    expect(Object.keys(actual[''].keys).length).to.eql(26);
    expect(Object.keys(actual[''].keys.binary.opt_value)).to.eql(['0']);
    // TODO make this test work
    // expect(Object.keys(actual[''].keys.n.opt_value)).to.eql(['month']);
  });

  it('should make SR parameters', () => {
    const actual = makeSRParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(3);
  });

  it('should make user defined parameters', () => {
    const actual = makeUserParameters(projectFixtureAllActive);
    expect(Object.keys(actual[''].keys).length).to.eql(1);
  });

  const sensitivity = {
    active: 'no',
    coupled: 'None',
    value: 'nan',
  };
  it('should make a base key value given a value and type', () => {
    const actual = makeBaseKey('1', 'int');
    const expected = {
      opt_value: '1',
      sensitivity,
      type: 'int',
    };
    expect(actual).to.eql(expected);
  });
  it('should make a null base key value given a null value and type', () => {
    const actual = makeBaseKey(null, 'int');
    const expected = {
      opt_value: null,
      sensitivity,
      type: 'int',
    };
    expect(actual).to.eql(expected);
  });
  it('should make a null base key value given an undefined value and type', () => {
    const actual = makeBaseKey(undefined, 'int');
    const expected = {
      opt_value: null,
      sensitivity,
      type: 'int',
    };
    expect(actual).to.eql(expected);
  });
});
