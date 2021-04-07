import { TS_NSR_PRICE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class NSRPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('NSR Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'NSR');
    this.tsName = TS_NSR_PRICE;
  }

  extraValidate() {
    return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
  }
}

export default NSRPriceTimeSeries;
