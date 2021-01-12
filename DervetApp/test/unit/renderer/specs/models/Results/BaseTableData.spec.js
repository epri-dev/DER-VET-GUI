import BaseTableData from '@/models/Results/BaseTableData';

describe('BaseTableData model', () => {
  it('(1) should convert the string to camel case', () => {
    const testString = 'Solar PV Fixed O&M Cost ($)';
    const expected = 'solarPVFixedOMCost';
    const actual = BaseTableData.toCamelCaseString(testString);
    expect(actual).to.eql(expected);
  });
  it('(2) returns true if an array is null ', () => {
    const testData = [null];
    expect(true).to.eql(BaseTableData.isRowNull(testData));
  });
  it('(3) parses year from date time stamp: "2017-01-01 1:00:00 AM" ', () => {
    const testString = '2017-01-01 1:00:00 AM';
    const expectedString = '2017';
    const actualString = BaseTableData.getYearFromString(testString);
    console.log(actualString);
    expect(actualString).to.eql(expectedString);
  });
});
