import TimeSeriesBase from './TimeSeriesBase';

class LFDownPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Down Price ($/kW)', data);
  }
}

export default LFDownPriceTimeSeries;
