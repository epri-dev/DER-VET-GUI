import TimeSeriesBase from './TimeSeriesBase';

class LFPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'LF');
  }
}

export default LFPriceTimeSeries;
