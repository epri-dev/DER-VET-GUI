import { MTS_RA_CAPACITY_PRICE } from '@/models/Project/constants';
import MonthlyBase from './MonthlyBase';

class RACapacityPriceMonthly extends MonthlyBase {
  constructor(data) {
    super('RA Capacity Price ($/kW)', data, 'RACapacityPrice');
    this.tsName = MTS_RA_CAPACITY_PRICE;
  }
}

export default RACapacityPriceMonthly;
