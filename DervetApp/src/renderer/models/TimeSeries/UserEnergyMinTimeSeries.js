import { TS_USER_ENERGY_MIN } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class UserEnergyMinTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Aggregate Energy Min (kWh)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
    this.tsName = TS_USER_ENERGY_MIN;
  }
}

export default UserEnergyMinTimeSeries;
