import BaseTableData from './BaseTableData';

export default class TimeseriesData extends BaseTableData {
  constructor(data) {
    super('timeseries_results.csv', data, true, true, 'Start Datetime (hb)');
    this.updateColumnDataByYearWithDate();
  }
  updateColumnDataByYearWithDate() {
    const date = this.data[0][this.getColumnIndex('Date')];
    const [year, month, day] = date.split('-');
    this.getFirstYearChartData().day = `${month}/${day}/${year}`;
  }
}

