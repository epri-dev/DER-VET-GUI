import TimeSeriesBase from './TimeSeriesBase';

class LFPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Price ($/kW)', data);
  }
}

export default LFPriceTimeSeries;
