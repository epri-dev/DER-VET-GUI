import { TS_LF_DOWN_PRICE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class LFDownPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Down Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'LF');
    this.tsName = TS_LF_DOWN_PRICE;
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

export default LFDownPriceTimeSeries;
