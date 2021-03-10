import TimeSeriesBase from './TimeSeriesBase';

class LFUpPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Up Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'LF');
  }
}

export default LFUpPriceTimeSeries;
