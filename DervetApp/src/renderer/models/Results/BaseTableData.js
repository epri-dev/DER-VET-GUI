class BaseTableData {
  constructor(fileName, hasHeaderRow) {
    this.fileName = fileName;
    this.data = null;
    this.hasHeaderRow = hasHeaderRow;
    this.columnHeaders = null;
    this.results_loaded = false;
  }
  getColumnIndex(colHeader) {
    const colInd = this.data[colHeader];
    // TODO
    return colInd;
  }
  getDataValueByColHeader(rowIndex, colHeader) {
    const dataVal = this.data[rowIndex][colHeader];
    // TODO
    return dataVal;
  }
  getDataValueByColIndex(rowIndex, colIndex) {
    const dataVal = this.data[rowIndex][colIndex];
    // TODO
    return dataVal;
  }
  set loadDataFromFile(folderPath) {
    this.results_loaded = true;
    this.data = folderPath; // read data at folder path
    // TODO
    // TODO set COLUMN_HEADERS attribute
    return this.results_loaded;
  }
}

export default BaseTableData;
