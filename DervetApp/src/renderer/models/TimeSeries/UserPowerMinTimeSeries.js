import { TS_USER_POWER_MIN } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class UserPowerMinTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('POI: max import (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
    this.tsName = TS_USER_POWER_MIN;
  }
}

export default UserPowerMinTimeSeries;
