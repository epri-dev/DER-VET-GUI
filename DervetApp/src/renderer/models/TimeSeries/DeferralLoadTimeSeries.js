import TimeSeriesBase from './TimeSeriesBase';

class DeferralLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Deferral Load (kW)', data);
    this.pageAttributes = this.getPageAttributes();
  }

  getPageAttributes() {
    return {
      pageGroup: 'components',
      pageKey: 'objectives',
      page: 'deferral',
    };
  }
}

export default DeferralLoadTimeSeries;
