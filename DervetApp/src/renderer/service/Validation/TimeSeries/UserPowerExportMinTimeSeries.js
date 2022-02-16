import DataArray from '@/service/Validation/TimeSeries/DataArray';

export default class UserPowerExportMinTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesUserDefined && (project.tsUserPowerExportMin.length > 0);
  }

  extraValidate() {
    return [this.invalidCheckValuesDontCrossZero().errorMsg];
  }
}
