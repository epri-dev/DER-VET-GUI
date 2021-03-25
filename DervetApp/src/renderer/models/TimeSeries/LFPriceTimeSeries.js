import { TS_LF_PRICE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class LFPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'LF');
    this.tsName = TS_LF_PRICE;
  }

  extraValidate() {
    return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
  }
}

export default LFPriceTimeSeries;
