import TimeSeriesBase from './TimeSeriesBase';

class LFPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes();
  }

  getPageAttributes() {
    return {
      pageGroup: 'components',
      pageKey: 'objectives',
      page: 'LF',
    };
  }
}

export default LFPriceTimeSeries;
