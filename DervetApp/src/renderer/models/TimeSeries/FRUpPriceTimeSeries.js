import { TS_FR_UP_PRICE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class FRUpPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Reg Up Price ($/kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'FR');
    this.tsName = TS_FR_UP_PRICE;
  }
}

export default FRUpPriceTimeSeries;
