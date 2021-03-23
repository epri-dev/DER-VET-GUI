import { TS_USER_POWER_IMPORT_MAX } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class UserPowerImportMaxTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('POI: Max Import (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
    this.tsName = TS_USER_POWER_IMPORT_MAX;
  }

  validate(expectedRowCount) {
    // parent class validate must return no errors before extra validation occurs
    let errorMsgArray = [super.validate(expectedRowCount)];
    const defaultValidate = this.formatErrorMsgArray(errorMsgArray);
    if (defaultValidate !== '') { return defaultValidate; }
    // extra validation specific to this class
    errorMsgArray = [this.invalidCheckValuesDontCrossZero().errorMsg];
    return this.formatErrorMsgArray(errorMsgArray);
  }
}

export default UserPowerImportMaxTimeSeries;
