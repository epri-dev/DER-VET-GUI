import { MTS_DR_MONTHS_APPLIED } from '@/models/Project/constants';
import MonthlyBase from './MonthlyBase';

class DRMonthsAppliedMonthly extends MonthlyBase {
  constructor(data) {
    super('DR Months (y/n)', data);
    this.tsName = MTS_DR_MONTHS_APPLIED;
  }
}

export default DRMonthsAppliedMonthly;
