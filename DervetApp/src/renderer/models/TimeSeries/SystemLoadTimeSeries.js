import { TS_SYSTEM_LOAD } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class SystemLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('System Load (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'systemInformation');
    this.tsName = TS_SYSTEM_LOAD;
  }
}

export default SystemLoadTimeSeries;
