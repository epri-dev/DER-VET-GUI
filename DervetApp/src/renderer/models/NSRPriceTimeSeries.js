import TimeSeriesBase from './TimeSeriesBase';

class NSRPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('NSR Price ($/kW)', data);
  }
}

export default NSRPriceTimeSeries;
