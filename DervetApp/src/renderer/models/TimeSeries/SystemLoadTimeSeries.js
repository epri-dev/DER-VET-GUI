import TimeSeriesBase from './TimeSeriesBase';

class SystemLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('System Load (kW)', data);
  }
}

export default SystemLoadTimeSeries;
