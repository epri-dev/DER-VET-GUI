import DataArray from '@/models/DataArray/DataArray.js';

class TimeSeriesBase extends DataArray {
  constructor(columnHeaderName, data, sampleDataFileName) {
    super(data);
    this.columnHeaderName = columnHeaderName;
    this.sampleDataFileName = sampleDataFileName;
    this.unit = this.getUnit();
    this.error = '';
    // this.required = false;
  }

  revalidate(expectedRowCount, sizingOn) {
    // returns error (a String)
    // with no error, this will be an empty string
    const errorMsgArray = [];
    errorMsgArray.push(this.invalidCheckRowsCount(expectedRowCount).errorMsg);
    errorMsgArray.push(this.extraValidate(sizingOn)[0]);
    return this.formatErrorMsgArray(errorMsgArray);
  }
}
export default TimeSeriesBase;
