import MonthlyDataArray from '@/service/Validation/TimeSeries/MonthlyDataArray';

export default class DRCapacityReservationMonthly extends MonthlyDataArray {
  isRequired(project) {
    return project.objectivesDR;
  }
}
