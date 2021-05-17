import { MTS_DR_MONTHS_APPLIED } from '@/models/Project/constants';
import MonthlyBase from './MonthlyBase';

class DRMonthsAppliedMonthly extends MonthlyBase {
  constructor(data) {
    super('DR Months (y/n)', data, 'DRMonthsApplied');
    this.tsName = MTS_DR_MONTHS_APPLIED;
  }

  extraValidate() {
    return [this.invalidCheckSingleValueInclusiveList([0, 1]).errorMsg];
  }
}

export default DRMonthsAppliedMonthly;
