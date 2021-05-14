import { TS_DA_PRICE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class DAPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('DA Price ($/kWh)', data, 'DAPrice');
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'DA');
    this.tsName = TS_DA_PRICE;
  }

  extraValidate() {
    return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
  }
}

export default DAPriceTimeSeries;
