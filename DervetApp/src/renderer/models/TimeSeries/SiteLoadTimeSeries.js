import { TS_SITE_LOAD } from '@/models/Project/constants';
import TimeSeriesBase from './TimeSeriesBase';

class SiteLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Site Load (kW)', data, 'SiteLoad');
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'siteInformation');
    this.tsName = TS_SITE_LOAD;
  }
}

export default SiteLoadTimeSeries;
