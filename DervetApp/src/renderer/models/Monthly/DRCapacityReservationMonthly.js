import { MTS_DR_CAPACITY_RESERVATION } from '@/models/Project/constants';
import MonthlyBase from './MonthlyBase';

class DRCapacityReservationMonthly extends MonthlyBase {
  constructor(data) {
    super('DR Capacity (kW)', data, 'DRCapacityReservation');
    this.tsName = MTS_DR_CAPACITY_RESERVATION;
  }
}

export default DRCapacityReservationMonthly;
