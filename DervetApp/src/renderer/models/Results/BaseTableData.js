class BaseTableData {
  constructor(fileName, data, hasHeaderRow) {
    this.fileName = fileName;
    this.data = null;
    this.hasHeaderRow = hasHeaderRow;
    this.columnHeaders = null;
    this.loadDataFromFile(data);
  }
  getColumnIndex(colHeader) {
    let i = 0;
    while (this.columnHeaders[i] !== colHeader) {
      if (i === this.columnHeaders.length) {
        i = -1;
        break;
      }
      i += 1;
    }
    return i;
  }
  getDataValueByColHeader(rowIndex, colHeader) {
    const colIndex = this.getColumnIndex(colHeader);
    return this.getDataValueByColIndex(rowIndex, colIndex);
  }
  getDataValueByColIndex(rowIndex, colIndex) {
    return this.data[rowIndex][colIndex];
  }
  loadDataFromFile(arrayData) {
    this.data = arrayData; // TODO read raw data at location
    if (this.hasHeaderRow) {
      [this.columnHeaders, ...this.data] = this.data;
    }
    return true;
  }
}

export default BaseTableData;
