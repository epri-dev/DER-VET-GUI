import _ from 'lodash';

import DataArray from '@/service/Validation/TimeSeries/DataArray.js';
import { makeTestHeader } from '../../shared';

describe('DataArray model', () => {
  makeTestHeader('-- DATA ARRAY MODEL --');

  const defaultData = new DataArray([]);

  it('should initiate instance properties properly', () => {
    const data = [3, null, 5];
    const threeRows = new DataArray(data);
    let actual = threeRows.rowSizes;
    let expected = [1, 1, 1];
    expect(actual).to.eql(expected);

    actual = threeRows.data;
    expect(actual).to.eql(data);

    actual = threeRows.length();
    expected = 3;
    expect(actual).to.eql(expected);

    actual = defaultData.length();
    expected = 0;
    expect(actual).to.eql(expected);
  });

  const fakeData = new DataArray([3, 22, 'aa', 2e1, 'z', 900.3]);
  const fakeData8784 = new DataArray(_.fill(Array(8784), 0));
  const fakeData8760 = new DataArray(_.fill(Array(8760), 0));

  it('should return invalidCheckRowsCount on data array properly', () => {
    let actual = fakeData.invalidCheckRowsCount(2020, 60);
    let expected = { errorMsg: '<b>Invalid Data:</b> This data has <b>6</b> entries. It must have 8784.' };
    expect(actual).to.eql(expected);

    actual = fakeData8784.invalidCheckRowsCount(2020, 60);
    expected = { errorMsg: null };
    expect(actual).to.eql(expected);

    actual = fakeData8760.invalidCheckRowsCount(2021, 60);
    expected = { errorMsg: null };
    expect(actual).to.eql(expected);
  });

  it('should return invalidCheckSingleValueNumeric properly', () => {
    const actual = fakeData.invalidCheckSingleValueNumeric();
    const expected = { errorMsg: '<b>2 Invalid Rows:</b> each value must be numeric : <b>Line Numbers:</b> [3,5]' };
    expect(actual).to.eql(expected);
  });

  const fakeData2 = new DataArray([3, 22, 2e1, 44, 4, 3]);

  it('should return invalidCheckSingleValueInclusiveList properly', () => {
    let actual = fakeData2.invalidCheckSingleValueInclusiveList([3, 22, 20, 44, 4, 3]);
    let expected = { errorMsg: null };
    expect(actual).to.eql(expected);

    actual = fakeData2.invalidCheckSingleValueInclusiveList([3, 22, 4, 20]);
    expected = { errorMsg: '<b>1 Invalid Row:</b> each value must be 3, 22, 4 or 20 : <b>Line Number:</b> [4]' };
    expect(actual).to.eql(expected);
  });

  it('should return invalidCheckSingleValueBetweenXAndY properly', () => {
    let actual = fakeData2.invalidCheckSingleValueBetweenXAndY(0, 21);
    let expected = { errorMsg: '<b>2 Invalid Rows:</b> each value must be between 0 and 21 : <b>Line Numbers:</b> [2,4]' };
    expect(actual).to.eql(expected);

    actual = fakeData2.invalidCheckSingleValueBetweenXAndY(3, 50);
    expected = { errorMsg: null };
    expect(actual).to.eql(expected);
  });

  it('should return invalidCheckSingleValueAtLeastX properly', () => {
    let actual = fakeData2.invalidCheckSingleValueAtLeastX(20);
    let expected = { errorMsg: '<b>3 Invalid Rows:</b> each value must be greater than or equal to 20 : <b>Line Numbers:</b> [1,5,6]' };
    expect(actual).to.eql(expected);

    actual = fakeData2.invalidCheckSingleValueAtLeastX(3);
    expected = { errorMsg: null };
    expect(actual).to.eql(expected);
  });

  const fakeData3 = new DataArray(
    [2, 0, 33, -0.1],
  );
  const fakeData4 = new DataArray(
    [0, -2.2, -44, 55],
  );

  it('should return invalidCheckValuesDontCrossZero properly', () => {
    let actual = fakeData3.invalidCheckValuesDontCrossZero();
    let expected = { errorMsg: '<b>Invalid Data:</b> This data has both positive and negative values. It must have only positive, or only negative values as it constrains power in one direction. This violation first occurs on row 4' };
    expect(actual).to.eql(expected);

    actual = fakeData4.invalidCheckValuesDontCrossZero();
    expect(actual).to.eql(expected);

    actual = fakeData2.invalidCheckValuesDontCrossZero();
    expected = { errorMsg: null };
    expect(actual).to.eql(expected);
  });

  const fakeData5 = new DataArray(
    [2, 0, -33, 22.2],
  );
  const fakeData6 = new DataArray(
    [0, 0, 2, 2],
  );

  it('should return infeasibleCheckMaxMustExceedMin properly', () => {
    let actual = fakeData5.infeasibleCheckMaxMustExceedMin([0, 0, 2, 2]);
    let expected = { errorMsg: null };
    expect(actual).to.eql(expected);

    actual = fakeData6.infeasibleCheckMaxMustExceedMin([2, 0, -33, 22.2]);
    expected = {
      errorMsg: '<b>3 Infeasible Rows:</b> For all times, values in <b>minimum timeseries</b> must not exceed those in <b>maximum timeseries</b> : <b>Line Numbers:</b> [1,3,4]',
    };
    expect(actual).to.eql(expected);
  });

  it('should return infeasibleCheckOnlyOneNonZero properly', () => {
    let actual = fakeData6.infeasibleCheckOnlyOneNonZero([-1, 1, 0, 0]);
    let expected = { errorMsg: null };
    expect(actual).to.eql(expected);

    actual = fakeData5.infeasibleCheckOnlyOneNonZero([0, 0, 2, 2]);
    expected = {
      errorMsg: '<b>2 Infeasible Rows:</b> For all times, values in <b>export</b> and <b>import</b> must not both be non-zero : <b>Line Numbers:</b> [3,4]',
    };
    expect(actual).to.eql(expected);
  });
});
