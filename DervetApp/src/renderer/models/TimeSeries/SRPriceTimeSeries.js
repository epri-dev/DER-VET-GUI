import TimeSeriesBase from './TimeSeriesBase';

class SRPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('SR Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'SR');
  }
}

export default SRPriceTimeSeries;
