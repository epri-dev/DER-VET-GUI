import { TS_LF_EOU } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class LFEnergyOptionUpTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Energy Option Up (kWh/kW-hr)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'LF');
    this.tsName = TS_LF_EOU;
  }

  validate(expectedRowCount) {
    // parent class validate must return no errors before extra validation occurs
    let errorMsgArray = [super.validate(expectedRowCount)];
    const defaultValidate = this.formatErrorMsgArray(errorMsgArray);
    if (defaultValidate !== '') { return defaultValidate; }
    // extra validation specific to this class
    errorMsgArray = [this.invalidCheckSingleValueBetweenXAndY(0, 1).errorMsg];
    return this.formatErrorMsgArray(errorMsgArray);
  }
}

export default LFEnergyOptionUpTimeSeries;
