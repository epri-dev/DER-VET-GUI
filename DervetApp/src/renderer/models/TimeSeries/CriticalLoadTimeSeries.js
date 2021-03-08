import TimeSeriesBase from './TimeSeriesBase';

class CriticalLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Critical Load (kW)', data);
    this.pageAttributes = this.getPageAttributes();
  }

  getPageAttributes() {
    return {
      pageGroup: 'components',
      pageKey: 'objectives',
      page: 'resilience',
    };
  }
}

export default CriticalLoadTimeSeries;
