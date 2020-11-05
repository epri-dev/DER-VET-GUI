import { ProFormaData, proFormaTableData, proFormaTableFields, proFormaArrayData } from '@/models/Results/ProFormaData';


describe('ProFormaData model', () => {
  const actualData = new ProFormaData(proFormaArrayData);
  it('should convert the string to camel case', () => {
    const testString = 'Solar PV Fixed O&M Cost ($)';
    const expected = 'solarPVFixedOMCost';
    const actual = ProFormaData.toCamelCaseString(testString);
    expect(actual).to.eql(expected);
  });

  it('should load data and column headers', () => {
    const expectedDataArr = [
      ['CAPEX YEAR', -6711650, -1660000, 0, 0, 0, 0, 0],
      [2017, 0, 0, -23030, -23030, -23030, 23030, 23030],
      [2018, 0, 0, -23030, -23030, -23030, 23030, 23030],
      [2019, 0, 0, -23030, -23030, -23030, 23030, 23030],
      [2020, 0, 0, -23030, -23030, -23030, 23030, 23030],
      [2021, 0, 0, -23030, -23030, -23030, 23030, 23030],
      [2022, 0, 0, -23030, -23030, -23030, 23030, 23030],
    ];
    const expectedColumnHeaders = ['Year', 'Storage Capital Cost', 'Solar PV Capital Cost', 'Storage Fixed O&M Cost', 'Storage Variable O&M Cost', 'Solar PV Fixed O&M Cost', 'Avoided Demand Charge', 'Avoided Energy Charge'];
    expect(actualData.data).to.eql(expectedDataArr);
    expect(actualData.columnHeaders).to.eql(expectedColumnHeaders);
  });

  const tableObject = actualData.createTable();

  it('should create the correct data objects to create a table', () => {
    let i = 0;
    while (i < tableObject.data.length) {
      expect(proFormaTableData[i]).to.eql(tableObject.data[i]);
      i += 1;
    }
  });

  it('should create the correct field objects to create a table', () => {
    let i = 0;
    while (i < tableObject.fields.length) {
      const check = proFormaTableFields[i];
      const against = tableObject.fields[i];
      expect([check.key, check.label]).to.eql([against.key, against.label]);
      i += 1;
    }
  });
});
