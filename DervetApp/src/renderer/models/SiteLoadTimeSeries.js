import TimeSeriesBase from './TimeSeriesBase';

class SiteLoadTimeSeries extends TimeSeriesBase {
  constructor(timestep, data) {
    super('Site Load (kW)', timestep, data);
  }
}

export default SiteLoadTimeSeries;
