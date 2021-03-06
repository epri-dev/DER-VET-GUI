import TimeSeriesBase from './TimeSeriesBase';

class SiteLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Site Load (kW)', data);
    this.pageAttributes = this.getPageAttributes();
  }

  getPageAttributes() {
    return {
      pageGroup: 'components',
      pageKey: 'objectives',
      page: 'siteInformation',
    };
  }

  // TODO: can a SiteLoadTimeSeries have negative values?
}

export default SiteLoadTimeSeries;
