class TimeSeriesBase {
  constructor(columnHeaderName, unit, data) {
    this.columnHeaderName = columnHeaderName;
    this.data = data;
    this.unit = unit;
  }
}

export default TimeSeriesBase;
