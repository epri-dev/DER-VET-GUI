import MonthlyBase from './MonthlyBase';

class DRCapacityMonthly extends MonthlyBase {
  constructor(data) {
    super('DR Capacity (kW)', data);
  }
}

export default DRCapacityMonthly;
