import DataArray from '@/models/DataArray/DataArray.js';

class TimeSeriesBase extends DataArray {
  constructor(columnHeaderName, data) {
    super(data);
    this.columnHeaderName = columnHeaderName;
    this.unit = this.getUnit();
    this.error = '';
    // this.required = false;
  }

  getUnit() {
    // find unit inside the ending parentheses from header
    // return empty string if undefined in header
    const unitMatchObject = this.columnHeaderName.match(/\(([^(]*?)\)$/);
    return (unitMatchObject) ? (unitMatchObject[1] || '') : '';
  }

  validate(expectedRowCount) {
    // returns a String with any/all error messages, or an empty String
    const errorMsgArray = [];
    errorMsgArray.push(this.invalidCheckRowsCount(expectedRowCount).errorMsg);
    errorMsgArray.push(this.invalidCheckRowSize(1).errorMsg);
    errorMsgArray.push(this.invalidCheckSingleValueNumeric().errorMsg);
    return errorMsgArray.filter((item) => item !== null).join('<br>');
  }

  revalidate(expectedRowCount) {
    // returns error (a String)
    // with no error, this will be an empty string
    const errorMsgArray = [];
    errorMsgArray.push(this.invalidCheckRowsCount(expectedRowCount).errorMsg);
    const error = errorMsgArray.filter((item) => item !== null).join('<br>');
    return error;
  }
}
export default TimeSeriesBase;
