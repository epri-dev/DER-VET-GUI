import {
  CostBenefitData,
  costBenefitArrayData,
  costBenefitSummaryData,
  costBenefitTraces,
} from '@/models/Results/CostBenefitData';

describe('CostBenefitData model', () => {
  const actualData = new CostBenefitData(costBenefitArrayData);
  it('(1A) should load data and column headers', () => {
    const expectedDataArr = [
      ['Lifetime Present Value', 210000000, 390000000],
      ['BATTERY: ess1 - Capital Cost', 2e5, 0],
      ['BATTERY: ess1 - Fixed O&M', 4e5, 0],
      ['BATTERY: ess1 - Variable O&M', 3e5, 0],
      ['PV: rooftop - Capital Cost', 9e5, 0],
      ['PV: rooftop - Fixed O&M', 4e5, 0],
      ['ICE: gen set - Capital Cost', 3e5, 0],
      ['ICE: gen set - Fixed O&M', 8e5, 0],
      ['ICE: gen set - Variable O&M', 1e5, 0],
      ['ICE: gen set - Fuel', 4e5, 0],
      ['ICE: gen set1 - Capital Cost', 3e5, 0],
      ['ICE: gen set1 - Fixed O&M', 8e5, 0],
      ['ICE: gen set1 - Variable O&M', 1e5, 0],
      ['ICE: gen set1 - Fuel', 4e5, 0],
      ['Avoided Demand Charge', 0, 6e5],
      ['Avoided Energy Charge', 0, 7e5],
      ['Spinning Reserves', 0, 9e5],
      ['Non-Spinning Reserves', 0, 6e5],
      ['Day Ahead ETS', 0, 8e5],
    ];
    const expectedColumnHeaders = ['', 'Costs ($)', 'Benefit ($)'];
    expect(actualData.data).to.eql(expectedDataArr);
    expect(actualData.columnHeaders).to.eql(expectedColumnHeaders);
  });
  it('(1B) select the data that respents the lifetime present value', () => {
    const lpv = actualData.summaryData();
    expect(lpv).to.eql(costBenefitSummaryData);
  });
  it('(1C-1) should load data and column headers', () => {
    const expectedDataArr = [
      ['Lifetime Present Value', 210000000, 390000000],
      ['BATTERY: ess1 - Capital Cost', 2e5, 0],
      ['BATTERY: ess1 - Fixed O&M', 4e5, 0],
      ['BATTERY: ess1 - Variable O&M', 3e5, 0],
      ['PV: rooftop - Capital Cost', 9e5, 0],
      ['PV: rooftop - Fixed O&M', 4e5, 0],
      ['ICE: gen set - Capital Cost', 3e5, 0],
      ['ICE: gen set - Fixed O&M', 8e5, 0],
      ['ICE: gen set - Variable O&M', 1e5, 0],
      ['ICE: gen set - Fuel', 4e5, 0],
      ['ICE: gen set1 - Capital Cost', 3e5, 0],
      ['ICE: gen set1 - Fixed O&M', 8e5, 0],
      ['ICE: gen set1 - Variable O&M', 1e5, 0],
      ['ICE: gen set1 - Fuel', 4e5, 0],
      ['Avoided Demand Charge', 0, 6e5],
      ['Avoided Energy Charge', 0, 7e5],
      ['Spinning Reserves', 0, 9e5],
      ['Non-Spinning Reserves', 0, 6e5],
      ['Day Ahead ETS', 0, 8e5],
    ];
    const expectedColumnHeaders = ['', 'Costs ($)', 'Benefit ($)'];
    expect(actualData.data).to.eql(expectedDataArr);
    expect(actualData.columnHeaders).to.eql(expectedColumnHeaders);
  });
  it('(1C) should create the correct trace objects', () => {
    const traces = actualData.createBarChartTraces();
    expect(traces.length).to.eql(costBenefitTraces.length);
    let i = 0;
    while (i < traces.length) {
      expect(traces[i].name).to.eql(costBenefitTraces[i].name);
      expect(traces[i].y).to.eql(costBenefitTraces[i].y);
      expect(traces[i].x).to.eql(costBenefitTraces[i].x);
      expect(traces[i].type).to.eql(costBenefitTraces[i].type);
      i += 1;
    }
  });
});
