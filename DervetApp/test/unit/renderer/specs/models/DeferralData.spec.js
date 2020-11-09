import {
  DeferralData,
  deferralArrayData,
  deferralDefaultData,
} from '@/models/Results/DeferralData';

describe('DeferralData model', () => {
  const actualData = new DeferralData(deferralArrayData);
  it('(1A) should load data and column headers', () => {
    const expectedDataArr = [
      [2017, 0.0, 0.0],
      [2018, 3678.1711256831004, 44557.96555596632],
      [2019, 3678.1711256831004, 44557.96555596632],
      [2020, 3678.1711256831004, 44557.96555596632],
      [2021, 3678.1711256831004, 44557.96555596632],
      [2022, 3678.1711256831004, 44557.96555596632],
      [2023, 3678.1711256831004, 44557.96555596632],
      [2024, 3678.1711256831004, 44557.96555596632],
      [2025, 3678.1711256831004, 44557.96555596632],
      [2026, 3678.1711256831004, 44557.96555596632],
      [2027, 3678.1711256831004, 44557.96555596632],
      [2028, 3678.1711256831004, 44557.96555596632],
      [2029, 3678.1711256831004, 44557.96555596632],
      [2030, 3678.1711256831004, 44557.96555596632],
      [2031, 3678.1711256831004, 44557.96555596632],
      [2032, 3985.7345481967623, 53757.97589547943],
      [2033, 4299.449239160698, 63398.80396926342],
      [2034, 4619.438223943913, 73280.86905941693],
      [2035, 4945.826988422792, 96405.41048699943],
      [2036, 5278.743528191248, 139161.52005703872],
      [2037, 5618.318398755073, 302054.8047520737],
      [null],
    ];
    const expectedColumnHeaders = [
      'Year',
      'Power Capacity Requirement (kW)',
      'Energy Capacity Requirement (kWh)',
    ];
    expect(actualData.data).to.eql(expectedDataArr);
    expect(actualData.columnHeaders).to.eql(expectedColumnHeaders);
  });
  it('(1A) should have data belonging to 1 year', () => {
    expect(actualData.columnDataByYear.length).to.eql(1);
  });
  const actualObj = actualData.getFirstYearChartData();
  it('(2A) should have the expected values - power requirement ', () => {
    const expectedPowReq = deferralDefaultData.powerCapacityRequirementKW;
    expect(actualObj.powerCapacityRequirementKW).to.eql(expectedPowReq);
  });
  it('(2B) should have the expected values - energy requirement ', () => {
    const expectedEneReq = deferralDefaultData.energyCapacityRequirementKWh;
    expect(actualObj.energyCapacityRequirementKWh).to.eql(expectedEneReq);
  });
  it('(2B) should have the labels ', () => {
    expect(actualObj.year).to.eql(deferralDefaultData.year);
  });
  it('(3) should have the correct keys ', () => {
    const actualKeys = Object.keys(actualObj);
    const expectedKeys = Object.keys(deferralDefaultData);
    let i = 0;
    while (i < expectedKeys.length) {
      expect(actualKeys[i]).to.eql(expectedKeys[i]);
      i += 1;
    }
  });
});
