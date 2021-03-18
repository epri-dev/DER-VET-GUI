import { TS_USER_ENERGY_MIN } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class UserEnergyMinTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Aggregate Energy Min (kWh)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
    this.tsName = TS_USER_ENERGY_MIN;
  }

  validate(expectedRowCount) {
    // parent class validate must return no errors before extra validation occurs
    const errorMsgArray = [super.validate(expectedRowCount)];
    const defaultValidate = this.formatErrorMsgArray(errorMsgArray);
    if (defaultValidate !== '') { return defaultValidate; }
    // extra validation specific to this class
    errorMsgArray.push(this.invalidCheckSingleValueAtLeastX(0).errorMsg);
    return this.formatErrorMsgArray(errorMsgArray);
  }
}

export default UserEnergyMinTimeSeries;
