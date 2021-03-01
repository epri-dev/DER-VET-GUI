import TimeSeriesBase from './TimeSeriesBase';

class FRPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('FR Price ($/kW)', data);
  }
}

export default FRPriceTimeSeries;
