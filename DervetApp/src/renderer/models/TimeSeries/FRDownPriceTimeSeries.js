import TimeSeriesBase from './TimeSeriesBase';

class FRDownPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Reg Down Price ($/kW)', data);
  }
}

export default FRDownPriceTimeSeries;
