import TimeSeriesBase from './TimeSeriesBase';

class LFDownPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Down Price ($/kW)', data);
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

export default LFDownPriceTimeSeries;
