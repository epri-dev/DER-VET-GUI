import cloneDeep from 'lodash/cloneDeep';
import DAPriceTimeSeries from '@/models/TimeSeries/DAPriceTimeSeries.js';

describe('DAPriceTimeSeries model', () => {
  it('should validate properly', () => {
    const threeValidRows = new DAPriceTimeSeries(
      [0, 1, [1]],
    );
    const threeValidRowsOrig = cloneDeep(threeValidRows);
    let actual = threeValidRows.validate(3);
    let expected = '';
    expect(actual).to.eql(expected);
    expect(threeValidRowsOrig).to.eql(threeValidRows);

    const defaultData = new DAPriceTimeSeries([]);
    const defaultDataOrig = cloneDeep(defaultData);
    actual = defaultData.validate(8760);
    expected = '<b>Invalid Data:</b> This file has <b>0</b> entries. It must have 8760';
    expect(actual).to.eql(expected);
    expect(defaultData).to.eql(defaultDataOrig);

    const threeInvalidRows = new DAPriceTimeSeries(
      [[0], [-4], [9]],
    );
    const threeInvalidRowsOrig = cloneDeep(threeInvalidRows);
    actual = threeInvalidRows.validate(3);
    const actual2 = threeInvalidRows.validate(3, false);
    const actual3 = threeInvalidRows.validate(3, true);
    expected = '<b>1 Invalid Row:</b> each value must be greater than or equal to 0 : <b>Line Number:</b> [2]';
    const expected2 = '';
    expect(actual).to.eql(expected2);
    expect(actual2).to.eql(expected2);
    expect(actual3).to.eql(expected);
    expect(threeInvalidRows).to.eql(threeInvalidRowsOrig);
  });

  it('should revalidate with success properly', () => {
    const threeRowsOrig = new DAPriceTimeSeries(
      [[0], [-9], [9]],
    );
    const threeRows = cloneDeep(threeRowsOrig);

    const actual = threeRows.revalidate(3);
    const actual2 = threeRows.revalidate(3, false);
    const actual3 = threeRows.revalidate(3, true);
    const expected = '<b>1 Invalid Row:</b> each value must be greater than or equal to 0 : <b>Line Number:</b> [2]';
    const expected2 = '';
    expect(actual).to.eql(expected2);
    expect(actual2).to.eql(expected2);
    expect(actual3).to.eql(expected);
    expect(threeRows).to.eql(threeRowsOrig);
  });

  it('should revalidate with failure properly', () => {
    const threeRowsOrig = new DAPriceTimeSeries(
      [[0], [-9], [9]],
    );
    const threeRows = cloneDeep(threeRowsOrig);
    const expected = '<b>Invalid Data:</b> This file has <b>3</b> entries. It must have 8760<br><b>1 Invalid Row:</b> each value must be greater than or equal to 0 : <b>Line Number:</b> [2]';
    const expected2 = '<b>Invalid Data:</b> This file has <b>3</b> entries. It must have 8760';

    const actual = threeRows.revalidate(8760);
    const actual2 = threeRows.revalidate(8760, false);
    const actual3 = threeRows.revalidate(8760, true);
    expect(actual).to.eql(expected2);
    expect(actual2).to.eql(expected2);
    expect(actual3).to.eql(expected);
    expect(threeRows).to.eql(threeRowsOrig);
  });
});
