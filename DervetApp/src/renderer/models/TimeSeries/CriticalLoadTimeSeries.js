import TimeSeriesBase from './TimeSeriesBase';

class CriticalLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Critical Load (kW)', data);
  }
}

export default CriticalLoadTimeSeries;
