import { TS_LF_DOWN_PRICE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class LFDownPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Down Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'LF');
    this.tsName = TS_LF_DOWN_PRICE;
  }

  extraValidate() {
    return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
  }
}

export default LFDownPriceTimeSeries;
