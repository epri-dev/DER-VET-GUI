import TimeSeriesBase from './TimeSeriesBase';

class UserPowerMaxTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Power Max (kW)', data);
  }
}

export default UserPowerMaxTimeSeries;
