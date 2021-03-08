import TimeSeriesBase from './TimeSeriesBase';

class UserPowerMinTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('POI: max import (kW)', data);
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

export default UserPowerMinTimeSeries;
