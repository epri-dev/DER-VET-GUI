import TimeSeriesBase from './TimeSeriesBase';

class CriticalLoadTimeSeries extends TimeSeriesBase {
  constructor(timestep, data) {
    super('Critical Load (kW)', timestep, data);
  }
}

export default CriticalLoadTimeSeries;
