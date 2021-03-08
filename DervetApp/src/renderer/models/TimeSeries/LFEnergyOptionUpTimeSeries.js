import TimeSeriesBase from './TimeSeriesBase';

class LFEnergyOptionUpTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Energy Option Up (kWh/kW-hr)', data);
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

export default LFEnergyOptionUpTimeSeries;
