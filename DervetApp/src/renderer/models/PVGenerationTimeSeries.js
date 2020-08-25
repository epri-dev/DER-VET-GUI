import TimeSeriesBase from './TimeSeriesBase';

class PVGenerationTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('PV Gen (kW/rated kW)', data);
  }
}

export default PVGenerationTimeSeries;
