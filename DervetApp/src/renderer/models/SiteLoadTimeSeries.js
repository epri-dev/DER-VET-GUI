import TimeSeriesBase from './TimeSeriesBase';

class SiteLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Site Load (kW)', data);
  }
}

export default SiteLoadTimeSeries;
