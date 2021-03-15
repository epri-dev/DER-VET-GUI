import { MTS_BACKUP_ENERGY_PRICE } from '@/models/Project/constants';
import MonthlyBase from './MonthlyBase';

class BackupEnergyPriceMonthly extends MonthlyBase {
  constructor(data) {
    super('Backup Price ($/kWh)', data);
    this.tsName = MTS_BACKUP_ENERGY_PRICE;
  }
}

export default BackupEnergyPriceMonthly;
