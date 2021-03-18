import { TS_USER_POWER_MAX } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class UserPowerMaxTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('POI: max export (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
    this.tsName = TS_USER_POWER_MAX;
  }
}

export default UserPowerMaxTimeSeries;
