class BaseTableData {
  constructor(
    fileName, rawArrayData, hasHeaderRow, columnifyData = false, dateTimeColName = null,
    nonNumericalCols = null,
  ) {
    this.fileName = fileName;
    this.hasHeaderRow = hasHeaderRow;
    this.columnifyData = columnifyData;
    this.dateTimeColName = dateTimeColName;
    this.nonNumericalCols = [];
    if (nonNumericalCols !== null) {
      const col = 0;
      while (col > nonNumericalCols.length) {
        this.nonNumericalCols.push(BaseTableData.toCamelCaseString(nonNumericalCols[col]));
      }
    }
    this.data = null;
    this.columnHeaders = null;
    this.columnDataByYear = null;
    this.loadDataFromFile(rawArrayData);
  }
  getColumnIndex(colHeader) {
    let i = 0;
    while (this.columnHeaders[i] !== colHeader) {
      if ((i + 1) === this.columnHeaders.length) {
        i = -1;
        break;
      }
      i += 1;
    }
    return i;
  }
  getColumnIndexThatContains(text) {
    let i = 0;
    while (this.columnHeaders[i].toLowerCase().indexOf(text) === -1) {
      if ((i + 1) === this.columnHeaders.length) {
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
    this.data = arrayData;
    if (this.hasHeaderRow) {
      [this.columnHeaders, ...this.data] = this.data;
    }
    if (this.columnifyData) {
      this.columnDataByYear = this.columnifyDataByYear();
    }
    return true;
  }
  static toCamelCaseString(text) {
    text = text.replace(/([^a-zA-Z0-9.])/g, ' ').replace(/[\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
    return text.substr(0, 1).toLowerCase() + text.substr(1);
  }
  emptyRowObjectTemplate() {
    // creates an object where the keys are CamelCased column headers
    // and the values are empty lists
    const template = {};
    let colNum = 0;
    while (colNum < this.columnHeaders.length) {
      const currentHeader = this.columnHeaders[colNum];
      if (currentHeader !== this.dateTimeColName) {
        const key = BaseTableData.toCamelCaseString(this.columnHeaders[colNum]);
        template[key] = [];
      }
      colNum += 1;
    }
    return template;
  }
  static getYearFromString(text) {
    const yearList = text.match(/\d{4}/g);
    if (yearList.length) {
      return yearList[0];
    }
    return 0;
  }
  indexOfDateTime() {
    return this.getColumnIndex(this.dateTimeColName);
  }
  hasDateTimeColumn() {
    return typeof (this.dateTimeColName) === 'string';
  }
  columnifyDataByYear() {
    // organize data by column instead of by row (in an object)
    const dataByYear = []; // each year of data will be saved here

    // intialize data object
    let currentData = this.emptyRowObjectTemplate();
    if (this.hasDateTimeColumn()) {
      // dataByYear.push(currentData);
      // determine first year of data
      const currentYear = BaseTableData.getYearFromString(this.data[0][this.indexOfDateTime()]);
      // save year of data
      currentData.year = currentYear;
    }
    // iterate over all rows
    let rowNum = 0;
    while (rowNum < this.data.length) {
      const rowData = this.data[rowNum];
      if (this.hasDateTimeColumn()) {
        // check if year has changed
        const currentYear = BaseTableData.getYearFromString(rowData[this.indexOfDateTime()]);
        if (currentYear !== currentData.year) {
          // TRUE --> append currentData to list, reset currentData and currentData.year
          dataByYear.push(currentData);
          // intialize data object, again...
          currentData = this.emptyRowObjectTemplate();
          // save year of data
          currentData.year = currentYear;
        }
        // FALSE --> continue iteration
      }
      // iterate over all columns
      let colNum = 0;
      while (colNum < this.columnHeaders.length) {
        if (colNum !== this.indexOfDateTime()) {
          const key = BaseTableData.toCamelCaseString(this.columnHeaders[colNum]);
          let value = null;
          if (this.nonNumericalCols.indexOf(key) >= 0) {
            value = rowData[colNum];
          } else {
            value = parseFloat(rowData[colNum]);
          }

          currentData[key].push(value);
        }
        colNum += 1;
      }
      rowNum += 1;
    }
    // append last year of data (bc loop breaks before it appends)
    dataByYear.push(currentData);
    return dataByYear;
  }
  getFirstYearChartData() {
    return this.columnDataByYear[0];
  }
}

export default BaseTableData;
