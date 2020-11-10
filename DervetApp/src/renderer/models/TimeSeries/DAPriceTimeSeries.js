import TimeSeriesBase from './TimeSeriesBase';

class DAPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('DA Price ($/kWh)', data);
  }
}

export default DAPriceTimeSeries;
