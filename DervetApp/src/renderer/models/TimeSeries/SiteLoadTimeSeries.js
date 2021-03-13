import TimeSeriesBase from './TimeSeriesBase';

class SiteLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Site Load (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'siteInformation');
  }
}

export default SiteLoadTimeSeries;
