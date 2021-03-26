import DataArray from '@/models/DataArray/DataArray.js';

class MonthlyBase extends DataArray {
  constructor(columnHeaderName, data) {
    super(data);
    this.columnHeaderName = columnHeaderName;
    this.unit = this.getUnit();
  }
}

export default MonthlyBase;
