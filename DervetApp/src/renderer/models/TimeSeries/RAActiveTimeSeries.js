import { TS_RA_ACTIVE } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class RAActiveTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('RA Active (y/n)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'RA');
    this.tsName = TS_RA_ACTIVE;
  }

  validate(expectedRowCount) {
    const errorMsgArray = [super.validate(expectedRowCount)];
    errorMsgArray.push(this.invalidCheckSingleValueInclusiveList([0, 1]).errorMsg);
    return errorMsgArray.filter((item) => ![null, ''].includes(item)).join('<br>');
  }
}

export default RAActiveTimeSeries;
