import { TS_FR_DOWN_PRICE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class FRDownPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Reg Down Price ($/kW)', data, 'FRDownPrice');
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'FR');
    this.tsName = TS_FR_DOWN_PRICE;
  }

  extraValidate() {
    return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
  }
}

export default FRDownPriceTimeSeries;
