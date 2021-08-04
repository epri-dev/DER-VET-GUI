import { TS_DA_PRICE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class DAPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('DA Price ($/kWh)', data, 'DAPrice');
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'DA');
    this.tsName = TS_DA_PRICE;
  }

  extraValidate(sizingOn) {
    // conditional validation:
    //   when sizing:     do not allow negative values
    //   when not sizing: do not perform extra validation
    if (sizingOn === true) return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
    return [];
  }
}

export default DAPriceTimeSeries;
