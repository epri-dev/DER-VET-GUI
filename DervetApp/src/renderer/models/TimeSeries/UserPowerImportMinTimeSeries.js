import { TS_USER_POWER_IMPORT_MIN } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class UserPowerImportMinTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('POI: Min Import (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
    this.tsName = TS_USER_POWER_IMPORT_MIN;
  }

  extraValidate() {
    return [this.invalidCheckValuesDontCrossZero().errorMsg];
  }
}

export default UserPowerImportMinTimeSeries;
