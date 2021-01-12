import _ from 'lodash';

class BaseTableData {
  constructor(
    fileName, rawArrayData, hasHeaderRow = false, columnifyData = false, dateTimeColName = null,
    nonNumericalCols = null,
  ) {
    this.fileName = fileName;
    this.hasHeaderRow = hasHeaderRow;
    this.columnifyData = columnifyData;
    this.dateTimeColName = dateTimeColName; // exclude from "columnifyDataByYear"
    this.nonNumericalCols = [];
    if (nonNumericalCols !== null) {
      _.forEach(nonNumericalCols, (col) => {
        this.nonNumericalCols.push(BaseTableData.toCamelCaseString(col));
      });
    }
    this.data = null;
    this.columnHeaders = null;
    this.columnDataByYear = null;
    this.loadDataFromFile(rawArrayData);
  }
  getColumnIndex(colHeader) {
    return _.findIndex(this.columnHeaders, item => (item === colHeader));
  }
  getColumnIndexThatContains(text) {
    return _.findIndex(this.columnHeaders, item => (item.toLowerCase().indexOf(text) !== -1));
  }
  getDataValueByColHeader(rowIndex, colHeader) {
    const colIndex = this.getColumnIndex(colHeader);
    return this.getDataValueByColIndex(rowIndex, colIndex);
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
    _.forEach(this.columnHeaders, (header) => {
      if ((header !== this.dateTimeColName) && (header !== null)) {
        const key = BaseTableData.toCamelCaseString(header);
        template[key] = [];
      }
    });
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
  static isRowNull(row) {
    return row[0] === null;
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
    const calculatedIndexOfDateTime = this.indexOfDateTime();
    // iterate over all rows
    _.forEach(this.data, (rowData) => {
      if (!BaseTableData.isRowNull(rowData)) {
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
        // iterate over all columns (expect datetime column)
        let colNum = 0;
        while (colNum < this.columnHeaders.length) {
          if (colNum !== calculatedIndexOfDateTime) {
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
      }
    });
    // append last year of data (bc loop breaks before it appends)
    dataByYear.push(currentData);
    return dataByYear;
  }
  getFirstYearChartData() {
    return this.columnDataByYear[0];
  }
}

export default BaseTableData;
