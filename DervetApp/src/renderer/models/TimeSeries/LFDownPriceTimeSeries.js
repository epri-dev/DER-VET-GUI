import TimeSeriesBase from './TimeSeriesBase';

class LFDownPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Down Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'LF');
  }
}

export default LFDownPriceTimeSeries;
