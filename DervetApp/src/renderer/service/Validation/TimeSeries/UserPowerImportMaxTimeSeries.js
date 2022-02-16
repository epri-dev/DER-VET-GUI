import DataArray from '@/service/Validation/TimeSeries/DataArray';

export default class UserPowerImportMaxTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesUserDefined && (project.tsUserPowerImportMax.length > 0);
  }

  extraValidate(project) {
    let error = this.invalidCheckValuesDontCrossZero().errorMsg;
    if (error === null) {
      error = this.infeasibleCheckMaxMustExceedMin(project.tsUserPowerImportMin).errorMsg;
    }
    return [error];
  }
}
