import MonthlyDataArray from '@/service/Validation/TimeSeries/MonthlyDataArray';

export default class DRCapacityPriceMonthly extends MonthlyDataArray {
  isRequired(project) {
    return project.objectivesDR;
  }
}
