import TimeSeriesBase from './TimeSeriesBase';

class PVGenerationTimeSeries extends TimeSeriesBase {
  constructor(data) {
    super('PV Gen (kW/rated kW)', data);
  }

  extraValidate() {
    return [this.invalidCheckSingleValueBetweenXAndY(0, 1).errorMsg];
  }
}

export default PVGenerationTimeSeries;
