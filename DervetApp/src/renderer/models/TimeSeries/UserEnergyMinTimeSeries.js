import TimeSeriesBase from './TimeSeriesBase';

class UserEnergyMinTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Aggregate Energy Min (kWh)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
  }
}

export default UserEnergyMinTimeSeries;
