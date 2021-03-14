import { MTS_DR_CAPACITY_PRICE } from '@/models/Project/constants';
import MonthlyBase from './MonthlyBase';

class DRCapacityPriceMonthly extends MonthlyBase {
  constructor(data) {
    super('DR Capacity Price ($/kW)', data);
    this.tsName = MTS_DR_CAPACITY_PRICE;
  }
}

export default DRCapacityPriceMonthly;
