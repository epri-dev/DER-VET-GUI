import TimeSeriesBase from './TimeSeriesBase';

class FRUpPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Reg Up Price ($/kW)', data);
  }
}

export default FRUpPriceTimeSeries;
