import MonthlyBase from './MonthlyBase';

class DREnergyMonthly extends MonthlyBase {
  constructor(data) {
    super('DR Energy ($/kWh)', data);
  }
}

export default DREnergyMonthly;
