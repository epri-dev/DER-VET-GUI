import TimeSeriesBase from './TimeSeriesBase';

class DeferralLoadTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Deferral Load (kW)', data);
  }
}

export default DeferralLoadTimeSeries;
