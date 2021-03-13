import TimeSeriesBase from './TimeSeriesBase';

class ControllableLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Site Load (kW)', data);
  }
}

export default ControllableLoadTimeSeries;
