import DataArray from '@/service/Validation/TimeSeries/DataArray';

export default class DAPriceTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesDA;
  }

  extraValidate(project) {
    if (project.sizingOn === true) return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
    return [];
  }
}
