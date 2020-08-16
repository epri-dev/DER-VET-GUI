import TimeSeriesBase from './TimeSeriesBase';

class PVGenerationTimeSeries extends TimeSeriesBase {
  constructor(timestep, data) {
    super('PV Gen (kW/rated kW)', timestep, data);
  }
}

export default PVGenerationTimeSeries;
