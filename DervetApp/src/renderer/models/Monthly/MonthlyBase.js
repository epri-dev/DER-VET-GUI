import DataArray from '@/models/DataArray/DataArray.js';

class MonthlyBase extends DataArray {
  constructor(columnHeaderName, data, sampleDataFileName) {
    super(data);
    this.columnHeaderName = columnHeaderName;
    this.sampleDataFileName = sampleDataFileName;
    this.unit = this.getUnit();
  }
}

export default MonthlyBase;
