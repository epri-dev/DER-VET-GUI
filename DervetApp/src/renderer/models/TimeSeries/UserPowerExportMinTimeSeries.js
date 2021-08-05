import { TS_USER_POWER_EXPORT_MIN } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class UserPowerExportMinTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('POI: Min Export (kW)', data, 'UserPowerExportMin');
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
    this.tsName = TS_USER_POWER_EXPORT_MIN;
  }

  extraValidate() {
    return [this.invalidCheckValuesDontCrossZero().errorMsg];
  }
}

export default UserPowerExportMinTimeSeries;
