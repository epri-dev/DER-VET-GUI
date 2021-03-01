import TimeSeriesBase from './TimeSeriesBase';

class FRUpPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('FR Up Price ($/kW)', data);
  }
}

export default FRUpPriceTimeSeries;
