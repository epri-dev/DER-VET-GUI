import { TS_LF_EOU } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class LFEnergyOptionUpTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Energy Option Up (kWh/kW-hr)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'LF');
    this.tsName = TS_LF_EOU;
  }

  extraValidate() {
    return [this.invalidCheckSingleValueBetweenXAndY(0, 1).errorMsg];
  }
}

export default LFEnergyOptionUpTimeSeries;
