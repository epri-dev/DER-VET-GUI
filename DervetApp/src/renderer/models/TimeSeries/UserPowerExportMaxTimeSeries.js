import { TS_USER_POWER_EXPORT_MAX } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class UserPowerExportMaxTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('POI: Max Export (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
    this.tsName = TS_USER_POWER_EXPORT_MAX;
  }

  extraValidate() {
    return [this.invalidCheckValuesDontCrossZero().errorMsg];
  }
}

export default UserPowerExportMaxTimeSeries;
