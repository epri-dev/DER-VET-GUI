import TimeSeriesBase from './TimeSeriesBase';

class LFEnergyOptionUpTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Energy Option Up (kWh/kW-hr)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'LF');
  }
}

export default LFEnergyOptionUpTimeSeries;
