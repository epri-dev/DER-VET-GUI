import TimeSeriesBase from './TimeSeriesBase';

class SystemLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('System Load (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'systemInformation');
  }
}

export default SystemLoadTimeSeries;
