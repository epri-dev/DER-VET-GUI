import MonthlyBase from './MonthlyBase';

class RACapacityPriceMonthly extends MonthlyBase {
  constructor(data) {
    super('RA Capacity Price ($/kW)', data);
  }
}

export default RACapacityPriceMonthly;
