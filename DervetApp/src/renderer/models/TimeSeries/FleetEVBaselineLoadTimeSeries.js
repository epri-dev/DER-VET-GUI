import TimeSeriesBase from './TimeSeriesBase';

class FleetEVBaselineLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('EV fleet', data);
  }
}

export default FleetEVBaselineLoadTimeSeries;
