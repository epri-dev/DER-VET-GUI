import TimeSeriesBase from './TimeSeriesBase';

class DAPriceTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('DA Price ($/kWh)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'DA');
  }
}

export default DAPriceTimeSeries;
