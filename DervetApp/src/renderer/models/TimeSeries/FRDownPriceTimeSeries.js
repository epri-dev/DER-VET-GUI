import TimeSeriesBase from './TimeSeriesBase';

class FRDownPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('tsFrDownPrice', 'Reg Down Price ($/kW)', data);
  }
}

export default FRDownPriceTimeSeries;
