import { MTS_DR_MONTHS_APPLIED } from '@/models/Project/constants';
import MonthlyBase from './MonthlyBase';

class DRMonthsAppliedMonthly extends MonthlyBase {
  constructor(data) {
    super('DR Months (y/n)', data);
    this.tsName = MTS_DR_MONTHS_APPLIED;
  }

  validate(expectedRowCount) {
    // parent class validate must return no errors before extra validation occurs
    const errorMsgArray = [super.validate(expectedRowCount)];
    const defaultValidate = this.formatErrorMsgArray(errorMsgArray);
    if (defaultValidate !== '') { return defaultValidate; }
    // extra validation specific to this class
    errorMsgArray.push(this.invalidCheckSingleValueInclusiveList([0, 1]).errorMsg);
    return this.formatErrorMsgArray(errorMsgArray);
  }
}

export default DRMonthsAppliedMonthly;
