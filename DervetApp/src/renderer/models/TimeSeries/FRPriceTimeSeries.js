import TimeSeriesBase from './TimeSeriesBase';

class FRPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('FR Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'FR');
  }
}

export default FRPriceTimeSeries;
