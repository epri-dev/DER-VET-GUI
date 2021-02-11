import TimeSeriesBase from './TimeSeriesBase';

class RAActiveTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('RA Acitve (y/n)', data);
  }
}

export default RAActiveTimeSeries;
