import DataArray from '@/models/DataArray/DataArray.js';

class TimeSeriesBase extends DataArray {
  constructor(columnHeaderName, data) {
    super(data);
    this.columnHeaderName = columnHeaderName;
    this.unit = this.getUnit();
    this.error = '';
    // this.required = false;
  }

  revalidate(expectedRowCount) {
    // returns error (a String)
    // with no error, this will be an empty string
    const errorMsgArray = [];
    errorMsgArray.push(this.invalidCheckRowsCount(expectedRowCount).errorMsg);
    return this.formatErrorMsgArray(errorMsgArray);
  }
}
export default TimeSeriesBase;
