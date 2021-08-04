import { TS_LF_EOD } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class LFEnergyOptionDownTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Energy Option Down (kWh/kW-hr)', data, 'LFEnergyOptionDown');
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'LF');
    this.tsName = TS_LF_EOD;
  }

  extraValidate() {
    return [this.invalidCheckSingleValueBetweenXAndY(0, 1).errorMsg];
  }
}

export default LFEnergyOptionDownTimeSeries;
