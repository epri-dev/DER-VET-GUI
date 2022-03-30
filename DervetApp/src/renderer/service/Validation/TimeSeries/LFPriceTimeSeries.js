import DataArray from '@/service/Validation/TimeSeries/DataArray';

export default class LFPriceTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesLF && (project.lfCombinedMarket === true);
  }

  extraValidate() {
    return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
  }
}
