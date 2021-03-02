import TimeSeriesBase from './TimeSeriesBase';

class RAActiveTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('RA Active (y/n)', data);
  }

  validate(expectedRowCount) {
    const errorMsgArray = [super.validate(expectedRowCount)];
    errorMsgArray.push(this.invalidCheckValuesInExclusiveList([0, 1]).errorMsg);
    return errorMsgArray.filter((item) => item !== null).join('<br>');
  }
}

export default RAActiveTimeSeries;
