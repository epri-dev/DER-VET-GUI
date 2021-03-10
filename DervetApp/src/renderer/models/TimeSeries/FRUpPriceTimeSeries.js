import TimeSeriesBase from './TimeSeriesBase';

class FRUpPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Reg Up Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'FR');
  }
}

export default FRUpPriceTimeSeries;
