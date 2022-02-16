import DataArray from '@/service/Validation/TimeSeries/DataArray';

export default class UserPowerExportMaxTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesUserDefined && (project.tsUserPowerExportMax.length > 0);
  }

  extraValidate(project) {
    let error = this.invalidCheckValuesDontCrossZero().errorMsg;
    if (error === null) {
      error = this.infeasibleCheckMaxMustExceedMin(project.tsUserPowerExportMin).errorMsg;
    }
    return [error];
  }
}
