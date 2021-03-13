import MonthlyBase from './MonthlyBase';

class DREnergyMonthly extends MonthlyBase {
  constructor(data) {
    super('Backup Energy ($/kWh)', data);
  }
}

export default DREnergyMonthly;
