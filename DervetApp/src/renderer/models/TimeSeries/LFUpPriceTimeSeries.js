import { TS_LF_UP_PRICE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class LFUpPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Up Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'LF');
    this.tsName = TS_LF_UP_PRICE;
  }
}

export default LFUpPriceTimeSeries;
