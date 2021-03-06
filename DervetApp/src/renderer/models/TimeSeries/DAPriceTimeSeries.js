import TimeSeriesBase from './TimeSeriesBase';

class DAPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('DA Price ($/kWh)', data);
    this.pageAttributes = this.getPageAttributes();
  }

  getPageAttributes() {
    return {
      pageGroup: 'components',
      pageKey: 'objectives',
      page: 'DA',
    };
  }
}

export default DAPriceTimeSeries;
