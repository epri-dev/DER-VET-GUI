import TimeSeriesBase from './TimeSeriesBase';

class EnergyOptionUpTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('LF Energy Option Up (kWh/kW-hr)', data);
  }
}

export default EnergyOptionUpTimeSeries;
