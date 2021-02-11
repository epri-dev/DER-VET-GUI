import TimeSeriesBase from './TimeSeriesBase';

class EnergyOptionDownTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Energy Option Down (kWh/kW-hr)', data);
  }
}

export default EnergyOptionDownTimeSeries;
