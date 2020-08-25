import TimeSeriesBase from './TimeSeriesBase';

class PriceTimeSeries extends TimeSeriesBase {
  constructor(priceFor, data) {
    if (priceFor === 'DA') {
      super(`${priceFor} Price ($/kWh)`, data);
    } else {
      super(`${priceFor} Price ($/kW)`, data);
    }
  }
}

export default PriceTimeSeries;
