import DataArray from '@/service/Validation/TimeSeries/DataArray';

class FRPriceTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesFR && (project.frCombinedMarket === true);
  }

  extraValidate() {
    return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
  }
}

export default FRPriceTimeSeries;
