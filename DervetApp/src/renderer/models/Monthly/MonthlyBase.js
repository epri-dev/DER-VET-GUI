import DataArray from '@/models/DataArray/DataArray.js';

class MonthlyBase extends DataArray {
  constructor(columnHeaderName, data) {
    super(data);
    this.columnHeaderName = columnHeaderName;
    this.unit = this.getUnit();
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
}

export default MonthlyBase;
