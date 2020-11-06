import {
  SizeData,
  sizeArrayData,
  sizeTableExpectedData,
  sizeTableExpectedFeilds,
  sizeArrayData1,
  sizeTableExpectedData1,
  sizeTableExpectedFeilds1,
  sizeArrayData2,
  sizeTableExpectedData2,
  sizeTableExpectedFeilds2,
} from '@/models/Results/SizeData';

describe('SizeData model', () => {
  // all feilds are present
  const actualData = new SizeData(sizeArrayData);
  it('(1A) should load data and column headers', () => {
    const expectedDataArr = [
      ['Storage', 19477, 2303, 2303, 0.85, 0.05, 1.0, 8.457, 1000, 800, 250, null, null],
      ['Solar PV', null, null, null, null, null, null, null, null, 1660, null, 3000, null],
      ['Generators', null, null, null, null, null, null, null, 750, 245, null, 1000, 3],
      [null],
    ];
    const expectedColumnHeaders = ['DER', 'Energy Rating (kWh)', 'Charge Rating (kW)', 'Discharge Rating (kW)', 'Round Trip Efficiency (%)', 'Lower Limit on SOC (%)', 'Upper Limit on SOC (%)', 'Duration (hours)', 'Capital Cost ($)', 'Capital Cost ($/kW)', 'Capital Cost ($/kWh)', 'Power Capacity (kW)', 'Quantity'];
    expect(actualData.data).to.eql(expectedDataArr);
    expect(actualData.columnHeaders).to.eql(expectedColumnHeaders);
  });
  it('(1B) should identify the correct index of column headers containing "capacity"', () => {
    const powerCapIndex = actualData.getColumnIndexThatContains('power');
    expect(powerCapIndex).to.eql(11);
  });
  const sizeTable = actualData.createSizeTable();
  const sizeTableData = sizeTable.data;
  it('(1C-1) should create the correct data objects - a size table', () => {
    expect(sizeTableData.length).to.eql(sizeTableExpectedData.length);
    let i = 0;
    while (i < sizeTableData.length) {
      expect(sizeTableData[i].systemName).to.eql(sizeTableExpectedData[i].systemName);

      const actualProperties = Object.getOwnPropertyNames(sizeTableData[i]);
      const expectedProperties = Object.getOwnPropertyNames(sizeTableExpectedData[i]);
      expect(actualProperties.length).to.eql(expectedProperties.length);

      i += 1;
    }
  });
  const sizeTableDataFields = sizeTable.fields;
  it('(1C-2) should create the correct field objects - size table', () => {
    expect(sizeTableDataFields.length).to.eql(sizeTableExpectedFeilds.length);
    let i = 0;
    while (i < sizeTableDataFields.length) {
      expect(sizeTableDataFields[i].key).to.eql(sizeTableExpectedFeilds[i].key);
      i += 1;
    }
  });
  const costTableDataRows = actualData.createCostTables();
  it('(1D-2) should create the correct number of cost table objects', () => {
    expect(costTableDataRows.length).to.eql(3);
  });
  it('(1D-2a) first object should create the correct number of items in an ESS cost table', () => {
    expect(costTableDataRows[0].items.length).to.eql(7);
  });
  it('(1D-2b) second object should create the correct number of items in a PV cost table', () => {
    expect(costTableDataRows[1].items.length).to.eql(3);
  });
  it('(1D-2c) should create the correct number of items in a ICE cost table', () => {
    expect(costTableDataRows[2].items.length).to.eql(5);
  });

  // Ess only present
  const actualData1 = new SizeData(sizeArrayData1);
  it('(2A) should load data and column headers - Ess only present', () => {
    const expectedDataArr = [
      ['Storage', 19477, 2303, 2303, 0.85, 0.05, 1.0, 8.457, 1000, 800, 250],
    ];
    const expectedColumnHeaders = ['DER', 'Energy Rating (kWh)', 'Charge Rating (kW)', 'Discharge Rating (kW)', 'Round Trip Efficiency (%)', 'Lower Limit on SOC (%)', 'Upper Limit on SOC (%)', 'Duration (hours)', 'Capital Cost ($)', 'Capital Cost ($/kW)', 'Capital Cost ($/kWh)'];
    expect(actualData1.data).to.eql(expectedDataArr);
    expect(actualData1.columnHeaders).to.eql(expectedColumnHeaders);
  });
  const sizeTableDataRows1 = actualData1.createDataObject();
  it('(2B-1) should create the correct data objects - a size table', () => {
    expect(sizeTableDataRows1.length).to.eql(sizeTableExpectedData1.length);
    let i = 0;
    while (i < sizeTableDataRows1.length) {
      expect(sizeTableDataRows1[i].systemName).to.eql(sizeTableExpectedData1[i].systemName);

      const actualProperties = Object.getOwnPropertyNames(sizeTableDataRows1[i]);
      const expectedProperties = Object.getOwnPropertyNames(sizeTableExpectedData1[i]);
      expect(actualProperties.length).to.eql(expectedProperties.length);
      i += 1;
    }
  });
  it('(2B-2) should create the correct field objects - size table', () => {
    const sizeTableDataFields1 = actualData1.createSizeTableFields();
    expect(sizeTableDataFields1.length).to.eql(sizeTableExpectedFeilds1.length);
    let i = 0;
    while (i < sizeTableDataRows1.length) {
      expect(sizeTableDataFields1[i].key).to.eql(sizeTableExpectedFeilds1[i].key);
      i += 1;
    }
  });

  const costTableDataRows1 = actualData1.createCostTables();
  it('(2C-1) should create the correct number of cost table objects', () => {
    expect(costTableDataRows1.length).to.eql(1);
  });
  it('(2C-2) first object should create the correct number of items in an ESS cost table', () => {
    expect(costTableDataRows1[0].items.length).to.eql(7);
  });

  // GENerators are present
  const actualData2 = new SizeData(sizeArrayData2);
  it('(3A) should load data and column headers', () => {
    const expectedDataArr = [
      ['Solar PV', null, 1660, null, 3000, null],
      ['Generators', 750, 245, null, 1000, 3],
    ];
    const expectedColumnHeaders = ['DER', 'Capital Cost ($)', 'Capital Cost ($/kW)', 'Capital Cost ($/kWh)', 'Power Capacity (kW)', 'Quantity'];
    expect(actualData2.data).to.eql(expectedDataArr);
    expect(actualData2.columnHeaders).to.eql(expectedColumnHeaders);
  });
  const sizeTableDataRows2 = actualData2.createDataObject();
  it('(3B-1) should create the correct data objects - a size table', () => {
    expect(sizeTableDataRows2.length).to.eql(sizeTableExpectedData2.length);
    let i = 0;
    while (i < sizeTableDataRows2.length) {
      expect(sizeTableDataRows2[i].systemName).to.eql(sizeTableExpectedData2[i].systemName);

      const actualProperties = Object.getOwnPropertyNames(sizeTableDataRows2[i]);
      const expectedProperties = Object.getOwnPropertyNames(sizeTableExpectedData2[i]);
      expect(actualProperties.length).to.eql(expectedProperties.length);
      i += 1;
    }
  });
  it('(3B-2) should create the correct field objects - size table', () => {
    const sizeTableDataFields = actualData2.createSizeTableFields();
    expect(sizeTableDataFields.length).to.eql(sizeTableExpectedFeilds2.length);
    let i = 0;
    while (i < sizeTableDataFields.length) {
      expect(sizeTableDataFields[i].key).to.eql(sizeTableExpectedFeilds2[i].key);
      i += 1;
    }
  });

  const costTableDataRows2 = actualData2.createCostTables();
  it('(3C) should create the correct number of cost table objects', () => {
    expect(costTableDataRows2.length).to.eql(2);
  });

  it('(3C-2a) first object should create the correct number of items in an PV cost table', () => {
    expect(costTableDataRows2[0].items.length).to.eql(3);
  });
  it('(3C-2b) second object should create the correct number of items in a ICE cost table', () => {
    expect(costTableDataRows2[1].items.length).to.eql(5);
  });

  it('(4) should find an ESS and return the correct P and E', () => {
    const essSize = actualData.findEssSize();
    expect(essSize.essEnergy).to.eql(19477);
    expect(essSize.essPower).to.eql(2303);
  });
});
