import TimeSeriesBase from './TimeSeriesBase';

class UserPowerMinTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('POI: max import (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
  }
}

export default UserPowerMinTimeSeries;
