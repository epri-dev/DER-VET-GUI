import DataArray from '@/service/Validation/TimeSeries/DataArray';

class SRPriceTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesSR;
  }

  extraValidate() {
    return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
  }
}

export default SRPriceTimeSeries;
