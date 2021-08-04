import { TS_USER_POWER_IMPORT_MAX } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class UserPowerImportMaxTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('POI: Max Import (kW)', data, 'UserPowerImportMax');
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
    this.tsName = TS_USER_POWER_IMPORT_MAX;
  }

  extraValidate() {
    return [this.invalidCheckValuesDontCrossZero().errorMsg];
  }
}

export default UserPowerImportMaxTimeSeries;
