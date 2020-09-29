import TimeSeriesBase from './TimeSeriesBase';

class UserPowerMinTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Power Min (kW)', data);
  }
}

export default UserPowerMinTimeSeries;
