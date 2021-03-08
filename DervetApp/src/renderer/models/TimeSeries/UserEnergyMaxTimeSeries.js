import TimeSeriesBase from './TimeSeriesBase';

class UserEnergyMaxTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('Aggregate Energy Max (kWh)', data);
    this.pageAttributes = this.getPageAttributes();
  }

  getPageAttributes() {
    return {
      pageGroup: 'components',
      pageKey: 'objectives',
      page: 'userDefined',
    };
  }
}

export default UserEnergyMaxTimeSeries;
