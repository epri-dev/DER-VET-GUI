import DataArray from '@/service/Validation/TimeSeries/DataArray';

export default class RAActiveTimeSeries extends DataArray {
  isRequired(project) {
    // TODO Use constant for selection method allowed value
    return project.objectivesRA && (project.raEventSelectionMethod === 'Peak by Month with Active Hours');
  }

  extraValidate() {
    return [this.invalidCheckSingleValueInclusiveList([0, 1]).errorMsg];
  }
}
