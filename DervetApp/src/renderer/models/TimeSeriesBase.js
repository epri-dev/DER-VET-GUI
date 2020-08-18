class TimeSeriesBase {
  constructor(columnHeaderName, timestep, data) {
    this.columnHeaderName = columnHeaderName;
    this.timestep = timestep;
    this.data = data;
  }
}

export default TimeSeriesBase;
