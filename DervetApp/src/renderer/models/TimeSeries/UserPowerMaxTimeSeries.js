import TimeSeriesBase from './TimeSeriesBase';

class UserPowerMaxTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('POI: max export (kW)', data);
    this.pageAttributes = this.getPageAttributes('components', 'objectives', 'userDefined');
  }
}

export default UserPowerMaxTimeSeries;
