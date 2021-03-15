import { TS_DA_PRICE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class DAPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('DA Price ($/kWh)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'DA');
    this.tsName = TS_DA_PRICE;
  }
}

export default DAPriceTimeSeries;
