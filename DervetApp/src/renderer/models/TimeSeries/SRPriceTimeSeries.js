import TimeSeriesBase from './TimeSeriesBase';

class SRPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('SR Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes();
  }

  getPageAttributes() {
    return {
      pageGroup: 'components',
      pageKey: 'objectives',
      page: 'SR',
    };
  }
}

export default SRPriceTimeSeries;
