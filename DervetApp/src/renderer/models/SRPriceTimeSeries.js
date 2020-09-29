import TimeSeriesBase from './TimeSeriesBase';

class SRPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('SR Price ($/kW)', data);
  }
}

export default SRPriceTimeSeries;
