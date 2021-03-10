import TimeSeriesBase from './TimeSeriesBase';

class DeferralLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Deferral Load (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'deferral');
  }
}

export default DeferralLoadTimeSeries;
