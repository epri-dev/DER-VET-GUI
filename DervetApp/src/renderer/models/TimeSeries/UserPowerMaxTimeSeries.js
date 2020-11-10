import TimeSeriesBase from './TimeSeriesBase';

class UserPowerMaxTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('POI: max export (kW)', data);
  }
}

export default UserPowerMaxTimeSeries;
