import TimeSeriesBase from './TimeSeriesBase';

class CriticalLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Critical Load (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'resilience');
  }
}

export default CriticalLoadTimeSeries;
