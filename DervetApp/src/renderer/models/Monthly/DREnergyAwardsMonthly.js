import MonthlyBase from './MonthlyBase';

class DREnergyAwardsMonthly extends MonthlyBase {
  constructor(data) {
    super('DR Energy Price ($/kWh)', data);
  }
}

export default DREnergyAwardsMonthly;
