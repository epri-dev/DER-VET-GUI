import TimeSeriesBase from './TimeSeriesBase';

class UserEnergyMaxTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Aggregate Energy Max (kWh)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
  }
}

export default UserEnergyMaxTimeSeries;
