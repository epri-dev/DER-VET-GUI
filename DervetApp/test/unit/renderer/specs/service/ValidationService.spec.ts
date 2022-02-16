// import fs from 'fs';
import _ from 'lodash';

import Page from '@/models/Application/Page';
import CollectionTypes from '@/models/Project/CollectionTypes';
import ValidationService from '@/service/Validation/ValidationService';
import { makeTestHeader } from '../shared';

describe('Validation service', () => {
  makeTestHeader('-- VALIDATION SERVICE -- ');

  const projectFixture: any = {
    objectivesDA: true,
    mtsBackupEnergyPrice: [],
    mtsBackupEnergyReservation: [],
    mtsDrCapacityPrice: [],
    mtsDrCapacityReservation: [],
    mtsDrEnergyPrice: [],
    mtsRaCapacityPrice: [],
    tsControllableLoadProfile: [],
    tsCriticalLoad: [],
    tsDaPrice: _.fill(Array(8759), 9000),
    tsDeferralLoad: _.fill(Array(8759), 9000),
    tsLfEOU: [],
    tsLfEOD: [],
    tsLfPrice: [],
    tsLfUpPrice: [],
    tsLfDownPrice: [],
    tsFrPrice: [],
    tsFrUpPrice: [],
    tsFrDownPrice: [],
    tsNsrPrice: [],
    tsSiteLoad: [],
    tsSrPrice: [],
    tsSystemLoad: [],
    tsRaActive: [],
    tsUserEnergyMax: _.fill(Array(8760), 9000),
    tsUserEnergyMin: _.fill(Array(8760), 0),
    tsUserPowerExportMax: _.fill(Array(8760), 1900),
    tsUserPowerExportMin: _.fill(Array(8760), -1900),
    [CollectionTypes.SolarPV]: [
      {
        id: 'foo',
        active: true,
        values: {
          tsSolarPVGenerationProfile: [],
        },
      },
      {
        id: 'bar',
        active: false,
        values: {
          tsSolarPVGenerationProfile: [],
        },
      },
    ],
  };

  it('should create an error object for all pages', () => {
    const actual = ValidationService.validate(projectFixture);
    // fs.writeFile('actual.json', JSON.stringify(actual), { encoding: 'utf8' }, err => err);
    const errMsg = 'Data year and timestep must be selected before timeseries can be uploaded.';
    expect(actual[Page.ObjectivesDA].errors.tsDaPrice).to.eql(errMsg);
  });
});
