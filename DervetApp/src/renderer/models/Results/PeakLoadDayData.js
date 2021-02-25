import BaseTableData from './BaseTableData';

export default class PeakLoadDayData extends BaseTableData {
  constructor(data) {
    super('peak_day_load.csv', data, true, true);
    this.updateColumnDataByYearWithDate();
  }

  updateColumnDataByYearWithDate() {
    const date = this.data[0][this.getColumnIndex('Date')];
    const [year, month, day] = date.split('-');
    this.getFirstYearChartData().day = `${month}/${day}/${year}`;
  }
}
