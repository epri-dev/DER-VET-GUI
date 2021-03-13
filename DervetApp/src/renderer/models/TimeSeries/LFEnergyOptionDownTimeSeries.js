import TimeSeriesBase from './TimeSeriesBase';

class LFEnergyOptionDownTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Energy Option Down (kWh/kW-hr)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'LF');
  }
}

export default LFEnergyOptionDownTimeSeries;
