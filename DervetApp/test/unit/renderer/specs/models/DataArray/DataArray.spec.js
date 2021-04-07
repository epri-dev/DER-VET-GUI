import DataArray from '@/models/DataArray/DataArray.js';

describe('DataArray model', () => {
  const defaultData = new DataArray([]);

  it('should initiate instance properties properly', () => {
    const threeRows = new DataArray(
      [[3], [], [5, 2]],
    );
    let actual = threeRows.rowSizes;
    let expected = [1, 0, 2];
    expect(actual).to.eql(expected);

    actual = threeRows.data;
    expected = [3, undefined, 5];
    expect(actual).to.eql(expected);

    actual = threeRows.length();
    expected = 3;
    expect(actual).to.eql(expected);

    actual = defaultData.length();
    expected = 0;
    expect(actual).to.eql(expected);
  });

  const fakeData = new DataArray(
    [[3], [22], ['aa'], [2e1], [44, 4], ['z', 900.3]],
  );

  it('should return invalidCheckRowsCount on array of arrays properly', () => {
    let actual = fakeData.invalidCheckRowsCount(6);
    let expected = { errorMsg: null };
    expect(actual).to.eql(expected);

    actual = fakeData.invalidCheckRowsCount('6');
    expected = { errorMsg: null };
    expect(actual).to.eql(expected);

    actual = fakeData.invalidCheckRowsCount(16);
    expected = { errorMsg: '<b>Invalid Data:</b> This file has <b>6</b> entries. It must have 16' };
    expect(actual).to.eql(expected);

    actual = defaultData.invalidCheckRowsCount('0');
    expected = { errorMsg: null };
    expect(actual).to.eql(expected);
  });

  const fakeDataB = new DataArray(
    [3, 22, 'aa', 2e1, 44, 'z'],
  );

  it('should return invalidCheckRowsCount on array properly', () => {
    let actual = fakeDataB.invalidCheckRowsCount(6);
    let expected = { errorMsg: null };
    expect(actual).to.eql(expected);

    actual = fakeDataB.invalidCheckRowsCount('6');
    expected = { errorMsg: null };
    expect(actual).to.eql(expected);

    actual = fakeDataB.invalidCheckRowsCount(16);
    expected = { errorMsg: '<b>Invalid Data:</b> This file has <b>6</b> entries. It must have 16' };
    expect(actual).to.eql(expected);
  });

  it('should return invalidCheckRowSize properly', () => {
    const actual = fakeData.invalidCheckRowSize(1);
    const expected = { errorMsg: '<b>2 Invalid Rows:</b> each row must have 1 value : <b>Line Numbers:</b> [5,6]' };
    expect(actual).to.eql(expected);
  });

  it('should return invalidCheckSingleValueNumeric properly', () => {
    const actual = fakeData.invalidCheckSingleValueNumeric();
    const expected = { errorMsg: '<b>1 Invalid Row:</b> each value must be numeric : <b>Line Number:</b> [3]' };
    expect(actual).to.eql(expected);
  });

  const fakeData2 = new DataArray(
    [[3], [22], [2e1], [44, 4], [3, 900.3]],
  );

  it('should return invalidCheckSingleValueInclusiveList properly', () => {
    let actual = fakeData2.invalidCheckSingleValueInclusiveList([3, 22, 44, 20]);
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
    let expected = { errorMsg: '<b>2 Invalid Rows:</b> each value must be greater than or equal to 20 : <b>Line Numbers:</b> [1,5]' };
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
    let expected = { errorMsg: '<b>Invalid Data:</b> This file has both positive and negative values. It must have only positive, or only negative values as it constrains power in one direction. This violation first occurs on row 4' };
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
    let actual = fakeData5.infeasibleCheckMaxMustExceedMin(fakeData6);
    let expected = { errorMsg: null, errorListMsg: null };
    expect(actual).to.eql(expected);

    actual = fakeData6.infeasibleCheckMaxMustExceedMin(fakeData5);
    expected = {
      errorMsg: '<b>3 Infeasible Rows:</b> For all times, values in <b>undefined</b> must not exceed those in <b>undefined</b> : <b>Line Numbers:</b> [1,3,4]',
      errorListMsg: 'Infeasible timeseries data: undefined and undefined',
    };
    expect(actual).to.eql(expected);
  });

  const fakeData7 = new DataArray(
    [-1, 1, 0, 0],
  );

  it('should return infeasibleCheckOnlyOneNonZero properly', () => {
    let actual = fakeData6.infeasibleCheckOnlyOneNonZero(fakeData7);
    let expected = { errorMsg: null, errorListMsg: null };
    expect(actual).to.eql(expected);

    actual = fakeData5.infeasibleCheckOnlyOneNonZero(fakeData6);
    expected = {
      errorMsg: '<b>2 Infeasible Rows:</b> For all times, values in <b>undefined</b> and <b>undefined</b> must not both be non-zero : <b>Line Numbers:</b> [3,4]',
      errorListMsg: 'Infeasible timeseries data: undefined and undefined',
    };
    expect(actual).to.eql(expected);
  });
});
