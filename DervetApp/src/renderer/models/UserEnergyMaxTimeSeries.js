import TimeSeriesBase from './TimeSeriesBase';

class UserEnergyMaxTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Energy Max (kWh)', data);
  }
}

export default UserEnergyMaxTimeSeries;
