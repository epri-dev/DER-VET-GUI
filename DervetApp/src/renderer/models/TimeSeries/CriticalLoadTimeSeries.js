import { TS_CRITICAL_LOAD } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class CriticalLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Critical Load (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'resilience');
    this.tsName = TS_CRITICAL_LOAD;
  }
}

export default CriticalLoadTimeSeries;
