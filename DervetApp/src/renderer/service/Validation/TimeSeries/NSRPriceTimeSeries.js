import DataArray from '@/service/Validation/TimeSeries/DataArray';

class NSRPriceTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesNSR;
  }

  extraValidate() {
    return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
  }
}

export default NSRPriceTimeSeries;
