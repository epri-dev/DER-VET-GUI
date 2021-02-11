import BaseTableData from './BaseTableData';

export default class DeferralData extends BaseTableData {
  constructor(data) {
    super('deferral_results.csv', data, true, true);
  }
  createBarChart() {
    const chartData = this.getFirstYearChartData();
    return {
      yearValues: chartData.year,
      powerValues: chartData.powerCapacityRequirementKW,
      energyValues: chartData.energyCapacityRequirementKWh,
    };
  }
}
