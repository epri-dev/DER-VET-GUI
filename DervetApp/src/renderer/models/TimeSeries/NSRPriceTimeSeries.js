import TimeSeriesBase from './TimeSeriesBase';

class NSRPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('NSR Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'NSR');
  }
}

export default NSRPriceTimeSeries;
