import MonthlyBase from './MonthlyBase';

class DRCapacityAwardsMonthly extends MonthlyBase {
  constructor(data) {
    super('DR Capacity Price ($/kW)', data);
  }
}

export default DRCapacityAwardsMonthly;
