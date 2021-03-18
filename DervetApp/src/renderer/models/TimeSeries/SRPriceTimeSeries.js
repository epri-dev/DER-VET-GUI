import { TS_SR_PRICE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class SRPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('SR Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'SR');
    this.tsName = TS_SR_PRICE;
  }
}

export default SRPriceTimeSeries;
