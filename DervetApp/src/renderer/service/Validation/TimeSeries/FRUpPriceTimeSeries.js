import DataArray from '@/service/Validation/TimeSeries/DataArray';

class FRUpPriceTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesFR && (project.frCombinedMarket === false);
  }

  extraValidate() {
    return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
  }
}

export default FRUpPriceTimeSeries;
