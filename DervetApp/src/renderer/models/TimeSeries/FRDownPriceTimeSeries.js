import TimeSeriesBase from './TimeSeriesBase';

class FRDownPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Reg Down Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'FR');
  }
}

export default FRDownPriceTimeSeries;
