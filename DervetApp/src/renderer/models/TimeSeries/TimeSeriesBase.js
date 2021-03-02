import DataArray from '@/models/DataArray/DataArray.js';

class TimeSeriesBase extends DataArray {
  constructor(columnHeaderName, data) {
    super(data);
    this.columnHeaderName = columnHeaderName;
    this.unit = this.getUnit();
    this.required = false;
    // this.errors = '';
  }

  getUnit() {
    // find unit inside the ending parentheses from header
    // return empty string if undefined in header
    const unitMatchObject = this.columnHeaderName.match(/([^(]*?)\)$/);
    return (unitMatchObject) ? (unitMatchObject[1] || '') : '';
  }

  validate(expectedRowCount) {
    // returns a String with any/all error messages, or an empty String
    const errorMsgArray = [];
    errorMsgArray.push(this.invalidCheckRowsCount(expectedRowCount).errorMsg);
    errorMsgArray.push(this.invalidCheckRowSize(1).errorMsg);
    errorMsgArray.push(this.invalidCheckSingleValueIsNumeric().errorMsg);
    return errorMsgArray.filter((item) => item !== null).join('<br>');
  }

  revalidate(expectedRowCount) {
    // adds errors property (a String) to the class, and also returns that string
    // with no errors, this will be an empty string
    const errorMsgArray = [];
    errorMsgArray.push(this.invalidCheckRowsCount(expectedRowCount).errorMsg);
    this.errors = errorMsgArray.filter((item) => item !== null).join('<br>');
    return this.errors;
  }
}
export default TimeSeriesBase;
