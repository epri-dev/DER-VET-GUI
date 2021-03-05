import TimeSeriesBase from './TimeSeriesBase';

class NSRPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('NSR Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes();
  }

  getPageAttributes() {
    return {
      pageGroup: 'components',
      pageKey: 'objectives',
      page: 'NSR',
    };
  }
}

export default NSRPriceTimeSeries;
