class TimeSeriesBase {
  constructor(columnHeaderName, data) {
    this.columnHeaderName = columnHeaderName;
    this.data = data;
    this.unit = this.getUnit();
  }

  getUnit() {
    // find unit inside the ending parentheses from header
    // return empty string if undefined in header
    const unitMatchObject = this.columnHeaderName.match(/([^(]*?)\)$/);
    return (unitMatchObject) ? (unitMatchObject[1] || '') : '';
  }
}
export default TimeSeriesBase;
