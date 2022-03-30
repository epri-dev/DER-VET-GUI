import MonthlyDataArray from '@/service/Validation/TimeSeries/MonthlyDataArray';

export default class RACapacityPriceMonthly extends MonthlyDataArray {
  isRequired(project) {
    return project.objectivesRA;
  }
}
