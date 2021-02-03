import TimeSeriesBase from './TimeSeriesBase';

class LFUpPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Up Price ($/kW)', data);
  }
}

export default LFUpPriceTimeSeries;
