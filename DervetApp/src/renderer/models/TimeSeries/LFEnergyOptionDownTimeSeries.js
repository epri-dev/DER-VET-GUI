import TimeSeriesBase from './TimeSeriesBase';

class LFEnergyOptionDownTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Energy Option Down (kWh/kW-hr)', data);
    this.pageAttributes = this.getPageAttributes();
  }

  getPageAttributes() {
    return {
      pageGroup: 'components',
      pageKey: 'objectives',
      page: 'LF',
    };
  }
}

export default LFEnergyOptionDownTimeSeries;
