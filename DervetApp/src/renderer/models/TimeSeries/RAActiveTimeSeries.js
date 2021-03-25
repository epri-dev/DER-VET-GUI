import { TS_RA_ACTIVE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class RAActiveTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('RA Active (y/n)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'RA');
    this.tsName = TS_RA_ACTIVE;
  }

  extraValidate() {
    return [this.invalidCheckSingleValueInclusiveList([0, 1]).errorMsg];
  }
}

export default RAActiveTimeSeries;
