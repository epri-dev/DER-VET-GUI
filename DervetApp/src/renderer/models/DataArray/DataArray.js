import { isNumeric } from '@/util/logic';

const noErrorObject = { errorMsg: null };

class DataArray {
  // class that describes a 2-D data structure (an array of arrays)
  // must also handle 1-D data (an array of values)
  constructor(data) {
    this.rowSizes = data.map(row => ((typeof row === 'object') ? row.length : 1));
    this.data = data.map(row => ((typeof row === 'object') ? row[0] : row)); // this is the first value of each row
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
    const entries = (actualRowsCount === 1) ? 'entry' : 'entries';
    return `<b>Invalid Data:</b> This file has <b>${actualRowsCount}</b> ${entries}. It must have ${expectedRowsCount}`;
  }

  errorMsgInvalidRows(violationName, invalidRows) {
    // return a String containing the error message
    const rows = (invalidRows.length === 1) ? 'Row' : 'Rows';
    return `<b>${invalidRows.length} Invalid ${rows}:</b> ${violationName} : [${this.arrayDisplayFirstFifteen(invalidRows)}]`;
  }

  getPageAttributes(pageGroup, pageKey, page) {
    return {
      pageGroup,
      pageKey,
      page,
    };
  }

  // invalidCheck methods return noErrorObject when no violations are found
  //   otherwise, they return an object that contains an errorMsg describing
  //   the error along with an array with row numbers for each violation
  // NOTE: row numbers start with 1
  // NOTE: these methods may need to be reconsidered if they hamper performance

  // these first 3 checks are performed for all TimeSeries and Monthly uploads
  invalidCheckRowsCount(x) {
    const actualRowsCount = this.length();
    if (actualRowsCount === parseFloat(x)) return noErrorObject;
    if (x === 'TBD') return noErrorObject;
    return {
      errorMsg: this.errorMsgInvalidData(actualRowsCount, x),
    };
  }

  invalidCheckRowSize(x) {
    const values = (parseFloat(x) === 1) ? 'value' : 'values';
    const invalidRows = this.rowSizes.reduce((a, val, i) => {
      if (val !== x) a.push(i + 1);
      return a;
    }, []);
    if (invalidRows.length === 0) return noErrorObject;
    const violationName = `each row must have ${x} ${values}`;
    return {
      errorMsg: this.errorMsgInvalidRows(violationName, invalidRows),
    };
  }

  invalidCheckSingleValueNumeric() {
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

  // these other checks can be performed for specific types of uploads
  invalidCheckSingleValueInclusiveList(validValuesList) {
    const invalidRows = this.data.reduce((a, val, i) => {
      if (!validValuesList.includes(val)) a.push(i + 1);
      return a;
    }, []);
    if (invalidRows.length === 0) return noErrorObject;
    const violationName = `each value must be ${this.listToString(validValuesList)}`;
    return {
      errorMsg: this.errorMsgInvalidRows(violationName, invalidRows),
    };
  }

  invalidCheckSingleValueBetweenXAndY(x, y) {
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

  invalidCheckSingleValueAtLeastX(x) {
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
