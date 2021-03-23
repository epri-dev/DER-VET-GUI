import { TS_RA_ACTIVE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class RAActiveTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('RA Active (y/n)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'RA');
    this.tsName = TS_RA_ACTIVE;
  }

  validate(expectedRowCount) {
    // parent class validate must return no errors before extra validation occurs
    let errorMsgArray = [super.validate(expectedRowCount)];
    const defaultValidate = this.formatErrorMsgArray(errorMsgArray);
    if (defaultValidate !== '') { return defaultValidate; }
    // extra validation specific to this class
    errorMsgArray = [this.invalidCheckSingleValueInclusiveList([0, 1]).errorMsg];
    return this.formatErrorMsgArray(errorMsgArray);
  }
}

export default RAActiveTimeSeries;
