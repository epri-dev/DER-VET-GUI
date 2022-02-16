import MonthlyDataArray from '@/service/Validation/TimeSeries/MonthlyDataArray';

export default class DREnergyPriceMonthly extends MonthlyDataArray {
  isRequired(project) {
    return project.objectivesDR;
  }
}
