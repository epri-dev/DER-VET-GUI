import MonthlyBase from './MonthlyBase';

class DREnergyAwardsMonthly extends MonthlyBase {
  constructor(data) {
    super('Backup Price ($/kWh)', data);
  }
}

export default DREnergyAwardsMonthly;
