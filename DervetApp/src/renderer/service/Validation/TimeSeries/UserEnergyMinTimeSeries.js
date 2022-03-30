import DataArray from '@/service/Validation/TimeSeries/DataArray';

export default class UserEnergyMinTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesUserDefined && (project.tsUserEnergyMin.length > 0);
  }

  extraValidate() {
    return [this.invalidCheckSingleValueAtLeastX(0).errorMsg];
  }
}
