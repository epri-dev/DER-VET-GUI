import DataArray from '@/service/Validation/TimeSeries/DataArray';

class PVGenerationTimeSeries extends DataArray {
  extraValidate() {
    return [this.invalidCheckSingleValueBetweenXAndY(0, 1).errorMsg];
  }
}

export default PVGenerationTimeSeries;
