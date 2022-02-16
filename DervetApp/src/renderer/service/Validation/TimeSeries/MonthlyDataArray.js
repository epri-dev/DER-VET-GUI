import DataArray from '@/service/Validation/TimeSeries/DataArray';

class MonthlyDataArray extends DataArray {
  constructor(data) {
    super(data, true);
  }
}

export default MonthlyDataArray;
