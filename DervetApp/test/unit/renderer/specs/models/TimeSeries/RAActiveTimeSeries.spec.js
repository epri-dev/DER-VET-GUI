import _ from 'lodash';

import RAActiveTimeSeries from '@/service/Validation/TimeSeries/RAActiveTimeSeries.js';
import projectFixture from '../../fixtures/models/dto/projectFixture.js';
import { makeTestHeader } from '../../shared';

describe('RAActiveTimeSeries model', () => {
  makeTestHeader('-- RA ACTIVE TIMESERIES -- ');

  it('should validate properly when invalid and not required', () => {
    const validRows = new RAActiveTimeSeries([]);
    const validRowsOrig = _.cloneDeep(validRows);
    const actual = validRows.validate(projectFixture);
    const expected = '';
    expect(actual).to.eql(expected);
    expect(validRowsOrig).to.eql(validRows);
  });

  it('should validate properly when no data and required', () => {
    projectFixture.objectivesRA = true;
    projectFixture.raEventSelectionMethod = 'Peak by Month with Active Hours';

    const validRows = new RAActiveTimeSeries([]);
    const validRowsOrig = _.cloneDeep(validRows);
    const actual = validRows.validate(projectFixture);
    const expected = '<b>Invalid Data:</b> These data are required.';
    expect(actual).to.eql(expected);
    expect(validRows).to.eql(validRowsOrig);
  });

  it('should validate properly when invalid and required', () => {
    projectFixture.objectivesRA = true;
    projectFixture.raEventSelectionMethod = 'Peak by Month with Active Hours';

    const validRows = new RAActiveTimeSeries(_.concat(0.5, _.fill(Array(8759), 1)));
    const validRowsOrig = _.cloneDeep(validRows);
    const actual = validRows.validate(projectFixture);
    const expected = '<b>1 Invalid Row:</b> each value must be 0 or 1 : <b>Line Number:</b> [1]';
    expect(actual).to.eql(expected);
    expect(validRows).to.eql(validRowsOrig);
  });
});
