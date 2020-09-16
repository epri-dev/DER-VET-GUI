import { ProFormaData, toCamelCaseString } from '@/models/Results/ProFormaData';
import formatYAxisCurrency from '@/util/chart';

describe('ProFormaData model', () => {
  const testCsv = [
    ['Year', 'Storage Capital Cost', 'Solar PV Capital Cost', 'Storage Fixed O&M Cost', 'Storage Variable O&M Cost', 'Solar PV Fixed O&M Cost', 'Avoided Demand Charge', 'Avoided Energy Charge'],
    ['CAPEX YEAR', -6711650, -1660000, 0, 0, 0, 0, 0],
    [2017, 0, 0, -23030, -23030, -23030, 23030, 23030],
    [2018, 0, 0, -23030, -23030, -23030, 23030, 23030],
    [2019, 0, 0, -23030, -23030, -23030, 23030, 23030],
    [2020, 0, 0, -23030, -23030, -23030, 23030, 23030],
    [2021, 0, 0, -23030, -23030, -23030, 23030, 23030],
    [2022, 0, 0, -23030, -23030, -23030, 23030, 23030],
  ];
  const actualData = new ProFormaData(testCsv);

  it('should convert the string to camel case', () => {
    const testString = 'Solar PV Fixed O&M Cost';
    const expected = 'solarPvFixedOMCost';

    const actual = toCamelCaseString(testString);

    expect(actual).to.eql(expected);
  });

  it('should load data and column headers', () => {
    const expectedData = [
      ['CAPEX YEAR', -6711650, -1660000, 0, 0, 0, 0, 0],
      [2017, 0, 0, -23030, -23030, -23030, 23030, 23030],
      [2018, 0, 0, -23030, -23030, -23030, 23030, 23030],
      [2019, 0, 0, -23030, -23030, -23030, 23030, 23030],
      [2020, 0, 0, -23030, -23030, -23030, 23030, 23030],
      [2021, 0, 0, -23030, -23030, -23030, 23030, 23030],
      [2022, 0, 0, -23030, -23030, -23030, 23030, 23030],
    ];
    const expectedColumnHeaders = ['Year', 'Storage Capital Cost', 'Solar PV Capital Cost', 'Storage Fixed O&M Cost', 'Storage Variable O&M Cost', 'Solar PV Fixed O&M Cost', 'Avoided Demand Charge', 'Avoided Energy Charge'];

    expect(actualData.data).to.eql(expectedData);
    expect(actualData.columnHeaders).to.eql(expectedColumnHeaders);
  });

  const tableObject = actualData.createTableData();
  it('should create the correct data objects to create a table', () => {
    const expectedData = [
      {
        year: 'CAPEX YEAR',
        storageCapitalCost: -6711650,
        solarPvCapitalCost: -1660000,
      },
      {
        year: 2017,
        storageFixedOMCost: -23030,
        storageVariableOMCost: -23030,
        solarPvFixedOMCost: -23030,
        avoidedDemandCharge: 23030,
        avoidedEnergyCharge: 23030,
      },
      {
        year: 2018,
        storageFixedOMCost: -23030,
        storageVariableOMCost: -23030,
        solarPvFixedOMCost: -23030,
        avoidedDemandCharge: 23030,
        avoidedEnergyCharge: 23030,
      },
      {
        year: 2019,
        storageFixedOMCost: -23030,
        storageVariableOMCost: -23030,
        solarPvFixedOMCost: -23030,
        avoidedDemandCharge: 23030,
        avoidedEnergyCharge: 23030,
      },
      {
        year: 2020,
        storageFixedOMCost: -23030,
        storageVariableOMCost: -23030,
        solarPvFixedOMCost: -23030,
        avoidedDemandCharge: 23030,
        avoidedEnergyCharge: 23030,
      },
      {
        year: 2021,
        storageFixedOMCost: -23030,
        storageVariableOMCost: -23030,
        solarPvFixedOMCost: -23030,
        avoidedDemandCharge: 23030,
        avoidedEnergyCharge: 23030,
      },
      {
        year: 2022,
        storageFixedOMCost: -23030,
        storageVariableOMCost: -23030,
        solarPvFixedOMCost: -23030,
        avoidedDemandCharge: 23030,
        avoidedEnergyCharge: 23030,
      },
    ];

    let i = 0;
    while (i < tableObject.data.length) {
      expect(expectedData[i]).to.eql(tableObject.data[i]);
      i += 1;
    }
  });

  it('should create the correct field objects to create a table', () => {
    const expectedFields = [
      {
        key: 'year',
        sortable: true,
        label: 'Year',
        formatter: null,
      },
      {
        key: 'storageCapitalCost',
        sortable: true,
        label: 'Storage Capital Cost',
        formatter: formatYAxisCurrency,
      },
      {
        key: 'solarPvCapitalCost',
        sortable: true,
        label: 'Solar PV Capital Cost',
        formatter: formatYAxisCurrency,
      },
      {
        key: 'storageFixedOMCost',
        sortable: true,
        label: 'Storage Fixed O&M Cost',
        formatter: formatYAxisCurrency,
      },
      {
        key: 'storageVariableOMCost',
        sortable: true,
        label: 'Storage Variable O&M Cost',
        formatter: formatYAxisCurrency,
      },
      {
        key: 'solarPvFixedOMCost',
        sortable: true,
        label: 'Solar PV Fixed O&M Cost',
        formatter: formatYAxisCurrency,
      },
      {
        key: 'avoidedDemandCharge',
        sortable: true,
        label: 'Avoided Demand Charge',
        formatter: formatYAxisCurrency,
      },
      {
        key: 'avoidedEnergyCharge',
        sortable: true,
        label: 'Avoided Energy Charge',
        formatter: formatYAxisCurrency,
      },
    ];

    let i = 0;
    while (i < tableObject.fields.length) {
      const check = expectedFields[i];
      const against = tableObject.fields[i];
      expect([check.key, check.label]).to.eql([against.key, against.label]);
      i += 1;
    }
  });
});
