import { isNumeric } from '@/util/logic';

const noErrorObject = { errorMsg: null };

class DataArray {
  // class that describes an array of arrays
  constructor(data) {
    this.rowSizes = data.map(row => row.length);
    this.data = data.map(row => row[0]); // this is the first value of each row
  }

  length() {
    return this.data.length;
  }

  arrayDisplayFirstFifteen(array) {
    const num = 15;
    return (array.length <= num) ? array : [array.slice(0, num), '...'];
  }

  errorMsgInvalidData(actualRowsCount, expectedRowsCount) {
    // return a String containing the error message
    return `<b>Invalid Data:</b> This file has <b>${actualRowsCount}</b> entries. It must have ${expectedRowsCount}`;
  }

  errorMsgInvalidRows(violationName, invalidRows) {
    // return a String containing the error message
    return `<b>${invalidRows.length} Invalid Rows:</b> ${violationName} : [${this.arrayDisplayFirstFifteen(invalidRows)}]`;
  }

  // invalidCheck methods return noErrorObject when no violations are found
  //   otherwise, they return an object with 1) an array with row numbers of every violation
  //   and 2) a string containing the error message
  // NOTE: row numbers start with 1
  invalidCheckRowsCount(x) {
    const actualRowsCount = this.length();
    console.log(x, actualRowsCount);
    // if (actualRowsCount === 0 || actualRowsCount === parseFloat(x)) return noErrorObject;
    if (actualRowsCount === parseFloat(x)
      && ![actualRowsCount, parseFloat(x)].includes(0)) return noErrorObject;
    return {
      errorMsg: this.errorMsgInvalidData(actualRowsCount, x),
    };
  }

  invalidCheckValuesInExclusiveList(validValuesList) {
    const invalidRows = this.data.reduce((a, val, i) => {
      if (!validValuesList.includes(val)) a.push(i + 1);
      return a;
    }, []);
    console.log(this.length());
    if (invalidRows.length === 0) return noErrorObject;
    const violationName = `each value must be ${this.listToString(validValuesList)}`;
    return {
      errorMsg: this.errorMsgInvalidRows(violationName, invalidRows),
    };
  }

  invalidCheckValuesBetweenXAndY(x, y) {
    const invalidRows = this.data.reduce((a, val, i) => {
      if (val < x || val > y) a.push(i + 1);
      return a;
    }, []);
    if (invalidRows.length === 0) return noErrorObject;
    const violationName = `each value must be between ${x} and ${y}`;
    return {
      errorMsg: this.errorMsgInvalidRows(violationName, invalidRows),
    };
  }

  invalidCheckValuesAtLeastX(x) {
    const invalidRows = this.data.reduce((a, val, i) => {
      if (val < x) a.push(i + 1);
      return a;
    }, []);
    if (invalidRows.length === 0) return noErrorObject;
    const violationName = `each value must be greater than or equal to ${x}`;
    return {
      errorMsg: this.errorMsgInvalidRows(violationName, invalidRows),
    };
  }

  invalidCheckRowSize(x) {
    const invalidRows = this.rowSizes.reduce((a, val, i) => {
      if (val !== x) a.push(i + 1);
      return a;
    }, []);
    if (invalidRows.length === 0) return noErrorObject;
    const violationName = `each row must have ${x} value`;
    return {
      errorMsg: this.errorMsgInvalidRows(violationName, invalidRows),
    };
  }

  invalidCheckSingleValueIsNumeric() {
    const x = 1;
    // checks for numeric value in rows where row size is 1
    const invalidRows = this.rowSizes.reduce((a, val, i) => {
      if (val === x && !isNumeric(this.data[i])) a.push(i + 1);
      return a;
    }, []);
    if (invalidRows.length === 0) return noErrorObject;
    const violationName = 'each value must be numeric';
    return {
      errorMsg: this.errorMsgInvalidRows(violationName, invalidRows),
    };
  }

  listToString(list, conjuntion = 'or') {
    return list.reduce((a, val, i) => {
      if (i === 0) {
        a += val;
      } else if (i === (list.length - 1)) {
        a += ` ${conjuntion} ${val}`;
      } else {
        a += `, ${val}`;
      }
      return a;
    }, '');
  }
}
export default DataArray;
