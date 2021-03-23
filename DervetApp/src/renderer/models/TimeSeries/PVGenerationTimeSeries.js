import TimeSeriesBase from './TimeSeriesBase';

class PVGenerationTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('PV Gen (kW/rated kW)', data);
  }

  validate(expectedRowCount) {
    // parent class validate must return no errors before extra validation occurs
    let errorMsgArray = [super.validate(expectedRowCount)];
    const defaultValidate = this.formatErrorMsgArray(errorMsgArray);
    if (defaultValidate !== '') { return defaultValidate; }
    // extra validation specific to this class
    errorMsgArray = [this.invalidCheckSingleValueBetweenXAndY(0, 1).errorMsg];
    return this.formatErrorMsgArray(errorMsgArray);
  }
}

export default PVGenerationTimeSeries;
