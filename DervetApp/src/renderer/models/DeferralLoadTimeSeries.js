import TimeSeriesBase from './TimeSeriesBase';

class DeferralLoadTimeSeries extends TimeSeriesBase {
  constructor(timestep, data) {
    super('Deferral Load (kW)', timestep, data);
  }
}

export default DeferralLoadTimeSeries;
