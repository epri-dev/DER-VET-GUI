class BaseTableData {
  constructor(fileName, data, hasHeaderRow, columnHeaders) {
    this.fileName = fileName;
    this.data = data;
    this.hasHeaderRow = hasHeaderRow;
    this.columnHeaders = null;
  }
  get getColumnIndex(colHeader) {
// TODO 
  	return 0;
  }
  get getDataValueByColHeader(rowIndex, colHeader) {
// TODO 
  	return this.data;
  }
  get getDataValueByColIndex(rowIndex, colIndex) {
// TODO 
  	return this.data;
  }
  loadDataFromFile(folderPath) {
// TODO 
// TODO set COLUMN_HEADERS attribute
  	return true;
  }
}

export default BaseTableData;