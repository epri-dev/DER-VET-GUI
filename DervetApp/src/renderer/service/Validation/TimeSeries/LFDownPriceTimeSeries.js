import DataArray from '@/service/Validation/TimeSeries/DataArray';

export default class LFDownPriceTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesLF && (project.lfCombinedMarket === false);
  }

  extraValidate() {
    return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
  }
}
