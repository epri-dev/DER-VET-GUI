import { MTS_BACKUP_ENERGY_RESERVATION } from '@/models/Project/constants';
import MonthlyBase from './MonthlyBase';

class BackupEnergyReservationMonthly extends MonthlyBase {
  constructor(data) {
    super('Backup Energy ($/kWh)', data, 'BackupEnergyReservation');
    this.tsName = MTS_BACKUP_ENERGY_RESERVATION;
  }
}

export default BackupEnergyReservationMonthly;
