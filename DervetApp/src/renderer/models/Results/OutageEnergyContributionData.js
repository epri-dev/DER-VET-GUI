import BaseTableData from './BaseTableData';

export default class OutageEnergyContributionData extends BaseTableData {
  constructor(data) {
    super('outage_energy_contributions.csv', data, true, true, 'Start Datetime (hb)');
    this.updateColumnDataByYearWithDate();
  }
  updateColumnDataByYearWithDate() {
    const date = this.data[0][this.getColumnIndex('Date')];
    const [year, month, day] = date.split('-');
    this.getFirstYearChartData().day = `${month}/${day}/${year}`;
  }
}

