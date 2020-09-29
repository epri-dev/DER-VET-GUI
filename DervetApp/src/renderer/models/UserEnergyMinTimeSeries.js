import TimeSeriesBase from './TimeSeriesBase';

class UserEnergyMinTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Energy Min (kWh)', data);
  }
}

export default UserEnergyMinTimeSeries;
