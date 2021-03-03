import cloneDeep from 'lodash/cloneDeep';
import RAActiveTimeSeries from '@/models/TimeSeries/RAActiveTimeSeries.js';

describe('RAActiveTimeSeries model', () => {

  it('should validate properly', () => {
    const threeValidRows = new RAActiveTimeSeries(
      [[0], [1], [1]],
    );
    const threeValidRowsOrig = cloneDeep(threeValidRows);
    let actual = threeValidRows.validate(3);
    let expected = '';
    expect(actual).to.eql(expected);
    expect(threeValidRowsOrig).to.eql(threeValidRows);

    const defaultData = new RAActiveTimeSeries([]);
    const defaultDataOrig = cloneDeep(defaultData);
    actual = defaultData.validate(8760);
    expected = '<b>Invalid Data:</b> This file has <b>0</b> entries. It must have 8760';
    expect(actual).to.eql(expected);
    expect(defaultData).to.eql(defaultDataOrig);

    const threeInvalidRows = new RAActiveTimeSeries(
      [[0], [-1], [1]],
    );
    const threeInvalidRowsOrig = cloneDeep(threeInvalidRows);
    actual = threeInvalidRows.validate(3);
    expected = '<b>1 Invalid Rows:</b> each value must be 0 or 1 : [2]';
    expect(actual).to.eql(expected);
    expect(threeInvalidRows).to.eql(threeInvalidRowsOrig);
  });

  it('should revalidate with success properly', () => {
    const threeRowsOrig = new RAActiveTimeSeries(
      [[0], [-1], [1]],
    );
    const threeRows = cloneDeep(threeRowsOrig);
    const threeRowsExpected = cloneDeep(threeRowsOrig);
    const expectedError = '';

    threeRowsExpected.errors = expectedError;
    let actual = threeRows.revalidate(3);
    let expected = expectedError;
    expect(actual).to.eql(expected);
    expect(threeRows).to.eql(threeRowsExpected);
    expect(threeRows).to.not.eql(threeRowsOrig);
  });

  it('should revalidate with failure properly', () => {
    const threeRowsOrig = new RAActiveTimeSeries(
      [[0], [-1], [1]],
    );
    const threeRows = cloneDeep(threeRowsOrig);
    const threeRowsExpected = cloneDeep(threeRowsOrig);
    const expectedError = '<b>Invalid Data:</b> This file has <b>3</b> entries. It must have 8760';

    threeRowsExpected.errors = expectedError;
    let actual = threeRows.revalidate(8760);
    let expected = expectedError;
    expect(actual).to.eql(expected);
    expect(threeRows).to.eql(threeRowsExpected);
    expect(threeRows).to.not.eql(threeRowsOrig);
  });

});


