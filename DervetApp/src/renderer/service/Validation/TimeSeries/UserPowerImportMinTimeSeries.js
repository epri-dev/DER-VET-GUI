import DataArray from '@/service/Validation/TimeSeries/DataArray';

export default class UserPowerImportMinTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesUserDefined && (project.tsUserPowerImportMin.length > 0);
  }

  extraValidate(project) {
    let error = this.invalidCheckValuesDontCrossZero().errorMsg;
    if (error === null) {
      error = this.infeasibleCheckOnlyOneNonZero(project.tsUserPowerExportMin).errorMsg;
    }
    return [error];
  }
}
