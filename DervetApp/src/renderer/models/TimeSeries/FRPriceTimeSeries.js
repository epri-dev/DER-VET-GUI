import { TS_FR_PRICE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class FRPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('FR Price ($/kW)', data, 'FRPrice');
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'FR');
    this.tsName = TS_FR_PRICE;
  }

  extraValidate() {
    return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
  }
}

export default FRPriceTimeSeries;
