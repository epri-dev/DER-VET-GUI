import { TS_NSR_PRICE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class NSRPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('NSR Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'NSR');
    this.tsName = TS_NSR_PRICE;
  }

  validate(expectedRowCount) {
    // parent class validate must return no errors before extra validation occurs
    let errorMsgArray = [super.validate(expectedRowCount)];
    const defaultValidate = this.formatErrorMsgArray(errorMsgArray);
    if (defaultValidate !== '') { return defaultValidate; }
    // extra validation specific to this class
    errorMsgArray = [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
    return this.formatErrorMsgArray(errorMsgArray);
  }
}

export default NSRPriceTimeSeries;
