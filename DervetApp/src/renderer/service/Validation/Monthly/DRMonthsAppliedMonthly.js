import MonthlyDataArray from '@/service/Validation/TimeSeries/MonthlyDataArray';

export default class DRMonthsAppliedMonthly extends MonthlyDataArray {
  isRequired(project) {
    return project.objectivesDR;
  }

  extraValidate() {
    // Check that at least one must be selected
    // If no, return that error message
    const noneSelectedErrorMsg = this.invalidCheckAtLeastOneSelected().errorMsg;
    const noneSelected = noneSelectedErrorMsg !== null;
    return noneSelected ? [noneSelectedErrorMsg]
      : [this.invalidCheckSingleValueInclusiveList([0, 1]).errorMsg];
  }
}
