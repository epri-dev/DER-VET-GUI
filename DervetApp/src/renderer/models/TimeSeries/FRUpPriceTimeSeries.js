import TimeSeriesBase from './TimeSeriesBase';

class FRUpPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('FR Up Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes();
  }

  getPageAttributes() {
    return {
      pageGroup: 'components',
      pageKey: 'objectives',
      page: 'FR',
    };
  }
}

export default FRUpPriceTimeSeries;
