import TimeSeriesBase from './TimeSeriesBase';

class FleetEVBaselineLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('EV fleet', data, 'FleetEVBaselineLoad');
  }
}

export default FleetEVBaselineLoadTimeSeries;
