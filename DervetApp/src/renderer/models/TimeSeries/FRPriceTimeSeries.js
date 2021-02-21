import TimeSeriesBase from './TimeSeriesBase';

class FRPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('tsFrPrice', 'FR Price ($/kW)', data);
  }
}

export default FRPriceTimeSeries;
