import TimeSeriesBase from './TimeSeriesBase';

class PriceTimeSeries extends TimeSeriesBase {
  constructor(timestep, priceFor, data) {
    if (priceFor === 'DA') {
      super(`${priceFor} Price ($/kWh)`, timestep, data);
    } else {
      super(`${priceFor} Price ($/kW)`, timestep, data);
    }
  }
}

export default PriceTimeSeries;
