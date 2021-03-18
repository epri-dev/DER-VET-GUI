import { TS_LF_EOD } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class LFEnergyOptionDownTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Energy Option Down (kWh/kW-hr)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'LF');
    this.tsName = TS_LF_EOD;
  }
}

export default LFEnergyOptionDownTimeSeries;
