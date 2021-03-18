import { MTS_DR_ENERGY_PRICE } from '@/models/Project/constants';
import MonthlyBase from './MonthlyBase';

class DREnergyPriceMonthly extends MonthlyBase {
  constructor(data) {
    super('DR Energy Price ($/kWh)', data);
    this.tsName = MTS_DR_ENERGY_PRICE;
  }
}

export default DREnergyPriceMonthly;
