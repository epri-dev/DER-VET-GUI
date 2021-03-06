import BeforeAndAfterMonthlyBillData from '@/models/Results/BeforeAndAfterMonthlyBillData';
import {
  monthlyBillArrayData,
  monthlyBillData,
} from '../../fixtures/models/Results/BeforeAndAfterMonthlyBillData';

describe('BeforeAndAfterMonthlyBillData model', () => {
  const actualData = new BeforeAndAfterMonthlyBillData(monthlyBillArrayData);
  it('(1A) should load data and column headers', () => {
    const expectedDataArr = [
      ['2017-01', -1.6641763522784455e-14, 24105.491740258232, '[1 2]', 8.526512829121202e-12, 105620.184375],
      ['2017-02', 1.6641763522784452e-14, 22110.09026172474, '[1 2]', 1.7053025658242404e-11, 112796.297775],
      ['2017-03', 7.564437964902028e-15, 27875.188511154698, '[1 2]', 1.7053025658242404e-11, 119607.5331],
      ['2017-04', 9.07732555788243e-15, 28106.526700931005, '[1 2]', 8.526512829121202e-12, 121938.62355],
      ['2017-05', 3.17706394525885e-14, 32971.547079860764, '[1 2]', 1.7053025658242404e-11, 122573.838975],
      ['2017-06', 1.2887539924122392e-14, 36293.4172163555, '[3 4]', 2.2737367544323206e-11, 163561.4688],
      ['2017-07', 6.4437699620611975e-15, 36937.1768341602, '[3 4]', 2.2737367544323206e-11, 167237.19449999998],
      ['2017-08', -3.2218849810305956e-15, 38207.55854033879, '[3 4]', 2.2737367544323206e-11, 183541.1412],
      ['2017-09', 2.5775079848244784e-14, 34999.04346602137, '[3 4]', 2.2737367544323206e-11, 164910.8468],
      ['2017-10', 11446.681473364684, 30552.73121996001, '[5 6]', 14999.595275000012, 82472.17224999999],
      ['2017-11', 10972.92587884349, 27220.861759315296, '[5 6]', 14999.59786500001, 75384.25720000001],
      ['2017-12', 12164.566383056015, 23844.61008682413, '[5 6]', 16174.273285000003, 71278.76250000001],
      ['2030-01', 0.0, 51415.28455750519, '[1 2]', 0.0, 225280.2760952352],
      ['2030-02', 0.0, 47159.236353604574, '[1 2]', 0.0, 240586.4111641053],
      ['2030-03', 0.0, 59455.77733233024, '[1 2]', 0.0, 255114.2874753004],
      ['2030-04', 0.0, 59949.20509495498, '[1 2]', 0.0, 260086.3361730611],
      ['2030-05', 0.0, 70325.94454735907, '[1 2]', 0.0, 261441.20510432406],
      ['2030-06', 0.0, 77411.25523802271, '[3 4]', 0.0, 348864.8790744567],
      ['2030-07', 0.0, 78784.34831957877, '[3 4]', 0.0, 356704.93829653045],
      ['2030-08', 0.0, 81493.98136185914, '[3 4]', 0.0, 391480.0869648695],
      ['2030-09', 0.0, 74650.44888674405, '[3 4]', 0.0, 351743.00554427557],
      ['2030-10', 0.0, 65166.783843688005, '[5 6]', 0.0, 175907.2268676277],
      ['2030-11', 0.0, 58060.14531196258, '[5 6]', 0.0, 160789.21255197082],
      ['2030-12', 0.0, 50858.842706342126, '[5 6]', 0.0, 152032.4868844625],
      [null],
    ];
    const expectedColumnHeaders = ['Month-Year', 'Energy Charge ($)', 'Original Energy Charge ($)', 'Billing Period', 'Demand Charge ($)', 'Original Demand Charge ($)'];
    expect(actualData.data).to.eql(expectedDataArr);
    expect(actualData.columnHeaders).to.eql(expectedColumnHeaders);
  });
  it('(1A) should have 2 years of data ', () => {
    expect(actualData.columnDataByYear.length).to.eql(2);
  });
  const actualMonthlyData = actualData.getFirstYearChartData();
  it('(2A) should have the expected Original Demand Charge ', () => {
    expect(actualMonthlyData.originalDemandCharge).to.eql(monthlyBillData.originalDemandCharge);
  });
  it('(2B) should have the expected Demand Charge ', () => {
    expect(actualMonthlyData.demandCharge).to.eql(monthlyBillData.demandCharge);
  });
  it('(2C) should have the expected Original Energy Charge ', () => {
    expect(actualMonthlyData.originalEnergyCharge).to.eql(monthlyBillData.originalEnergyCharge);
  });
  it('(2D) should have the expected Energy Charge ', () => {
    expect(actualMonthlyData.energyCharge).to.eql(monthlyBillData.energyCharge);
  });
});
