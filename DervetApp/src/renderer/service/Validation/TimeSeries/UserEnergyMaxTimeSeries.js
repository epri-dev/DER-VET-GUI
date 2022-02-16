import DataArray from '@/service/Validation/TimeSeries/DataArray';

export default class UserEnergyMaxTimeSeries extends DataArray {
  isRequired(project) {
    return project.objectivesUserDefined && (project.tsUserEnergyMax.length > 0);
  }

  extraValidate(project) {
    let error = this.invalidCheckSingleValueAtLeastX(0).errorMsg;
    if (error === null) {
      error = this.infeasibleCheckMaxMustExceedMin(project.tsUserEnergyMin).errorMsg;
    }
    return [error];
  }
}
