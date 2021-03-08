import TimeSeriesBase from './TimeSeriesBase';

class LFUpPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Up Price ($/kW)', data);
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

export default LFUpPriceTimeSeries;
