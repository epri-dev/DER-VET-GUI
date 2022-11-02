import _ from 'lodash';

import DAPriceTimeSeries from '@/service/Validation/TimeSeries/DAPriceTimeSeries.js';
import projectFixture from '../../fixtures/models/dto/projectFixture.js';
import { makeTestHeader } from '../../shared';

describe('DAPriceTimeSeries model', () => {
  makeTestHeader('-- DA PRICE TIMESERIES -- ');

  const projectFixtureClone = _.cloneDeep(projectFixture);

  projectFixtureClone.objectivesDA = true;
  projectFixtureClone.sizingEquipment = true;

  it('should validate valid rows properly', () => {
    const validRows = new DAPriceTimeSeries(_.fill(Array(8760), 1));
    const validRowsOrig = _.cloneDeep(validRows);
    const actual = validRows.validate(projectFixtureClone);
    const expected = '';
    expect(actual).to.eql(expected);
    expect(validRowsOrig).to.eql(validRows);
  });

  it('should validate too few rows properly', () => {
    const shortRows = new DAPriceTimeSeries([1, 2, 3]);
    const shortRowsOrig = _.cloneDeep(shortRows);
    const actual = shortRows.validate(projectFixtureClone);
    const expected = '<b>Invalid Data:</b> This data has <b>3</b> entries. It must have 8760.';
    expect(actual).to.eql(expected);
    expect(shortRows).to.eql(shortRowsOrig);
  });

  it('should validate negative properly', () => {
    const someNegatives = new DAPriceTimeSeries(_.concat([-1], _.fill(Array(8759), 1)));
    const someNegativesOrig = _.cloneDeep(someNegatives);
    const actual = someNegatives.validate(projectFixtureClone);
    const expected = '<b>1 Invalid Row:</b> each value must be greater than or equal to 0 : <b>Line Number:</b> [1]';
    expect(actual).to.eql(expected);
    expect(someNegatives).to.eql(someNegativesOrig);
  });
});
