import TimeSeriesBase from './TimeSeriesBase';

class SystemLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('System Load (kW)', data);
    this.pageAttributes = this.getPageAttributes();
  }

  getPageAttributes() {
    return {
      pageGroup: 'components',
      pageKey: 'objectives',
      page: 'systemInformation',
    };
  }
}

export default SystemLoadTimeSeries;
