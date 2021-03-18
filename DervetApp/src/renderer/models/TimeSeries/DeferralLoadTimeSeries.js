import { TS_DEFERRAL_LOAD } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class DeferralLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Deferral Load (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'deferral');
    this.tsName = TS_DEFERRAL_LOAD;
  }
}

export default DeferralLoadTimeSeries;
