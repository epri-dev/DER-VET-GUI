import TimeSeriesBase from './TimeSeriesBase';

class ControllableLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Site Load (kW)', data, 'ControllableLoad');
  }
}

export default ControllableLoadTimeSeries;
