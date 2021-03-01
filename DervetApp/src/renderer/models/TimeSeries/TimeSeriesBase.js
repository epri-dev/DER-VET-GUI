import DataArray from '@/models/DataArray/DataArray.js';

class TimeSeriesBase {
  constructor(columnHeaderName, data) {
    this.columnHeaderName = columnHeaderName;
    // this.data = data;
    this.dataArray = new DataArray(data);
    this.data = this.dataArray.dataValues;
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
    errorMsgArray.push(this.dataArray.invalidCheckRowsCount(expectedRowCount).errorMsg);
    errorMsgArray.push(this.dataArray.invalidCheckRowSize(1).errorMsg);
    errorMsgArray.push(this.dataArray.invalidCheckSingleValueIsNumeric().errorMsg);
    return errorMsgArray.filter((item) => item !== null).join('<br>');
  }

  revalidate(expectedRowCount) {
    const errorMsgArray = [];
    errorMsgArray.push(this.dataArray.invalidCheckRowsCount(expectedRowCount).errorMsg);
    return errorMsgArray.filter((item) => item !== null).join('<br>');
  }
}
export default TimeSeriesBase;
