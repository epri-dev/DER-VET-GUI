import TimeSeriesBase from './TimeSeriesBase';

class UserPowerMinTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('POI: max import (kW)', data);
  }
}

export default UserPowerMinTimeSeries;
