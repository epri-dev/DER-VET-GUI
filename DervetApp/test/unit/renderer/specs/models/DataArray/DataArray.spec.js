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
    const expected = { errorMsg: '<b>2 Invalid Rows:</b> each row must have 1 value : [5,6]' };
    expect(actual).to.eql(expected);
  });

  it('should return invalidCheckSingleValueNumeric properly', () => {
    const actual = fakeData.invalidCheckSingleValueNumeric();
    const expected = { errorMsg: '<b>1 Invalid Rows:</b> each value must be numeric : [3]' };
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
    expected = { errorMsg: '<b>1 Invalid Rows:</b> each value must be 3, 22, 4 or 20 : [4]' };
    expect(actual).to.eql(expected);
  });

  it('should return invalidCheckSingleValueBetweenXAndY properly', () => {
    let actual = fakeData2.invalidCheckSingleValueBetweenXAndY(0, 21);
    let expected = { errorMsg: '<b>2 Invalid Rows:</b> each value must be between 0 and 21 : [2,4]' };
    expect(actual).to.eql(expected);

    actual = fakeData2.invalidCheckSingleValueBetweenXAndY(3, 50);
    expected = { errorMsg: null };
    expect(actual).to.eql(expected);
  });

  it('should return invalidCheckSingleValueAtLeastX properly', () => {
    let actual = fakeData2.invalidCheckSingleValueAtLeastX(20);
    let expected = { errorMsg: '<b>2 Invalid Rows:</b> each value must be greater than or equal to 20 : [1,5]' };
    expect(actual).to.eql(expected);

    actual = fakeData2.invalidCheckSingleValueAtLeastX(3);
    expected = { errorMsg: null };
    expect(actual).to.eql(expected);
  });
});
