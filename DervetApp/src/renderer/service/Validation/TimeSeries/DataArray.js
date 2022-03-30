import _ from 'lodash';

import { isNumeric } from '@/util/logic';
import { getNumberOfTimeStepsInYear } from '@/util/time';

const noErrorObject = { errorMsg: null };
const noInfeasibleErrorObject = { errorMsg: null };

class DataArray {
  // class that describes a 2-D data structure (an array of arrays)
  // must also handle 1-D data (an array of values)
  constructor(data, isMonthly = false) {
    this.data = data;
    this.rowSizes = _.times(data.length, _.constant(1));
    this.isMonthly = isMonthly;
  }

  isRequired() {
    return true;
  }

  length() {
    return this.data.length;
  }

  arrayDisplayFirstFifteen(array) {
    const num = 15;
    return (array.length <= num) ? array : [array.slice(0, num), '...'];
  }

  errorMsgMissingTimestepOrDataYear() {
    return 'Data year and timestep must be selected before timeseries can be uploaded.';
  }

  errorMsgInvalidData(actualRowsCount, expectedRowsCount) {
    // return a String containing the error message
    const entries = (actualRowsCount === 1) ? 'entry' : 'entries';
    return `<b>Invalid Data:</b> This data has <b>${actualRowsCount}</b> ${entries}. It must have ${expectedRowsCount}.`;
  }

  errorMsgInvalidDataCustom(customErrorMsg, firstOccurrenceRowNum = undefined) {
    // return a String containing the error message
    const firstRowViolation = firstOccurrenceRowNum
      ? `This violation first occurs on row ${firstOccurrenceRowNum}`
      : '';
    return `${customErrorMsg}${firstRowViolation}`;
  }

  errorMsgInfeasibleRows(violationName, invalidRows) {
    // return a String containing the error message
    const rows = (invalidRows.length === 1) ? 'Row' : 'Rows';
    const numbers = (invalidRows.length === 1) ? 'Number' : 'Numbers';
    return `<b>${invalidRows.length} Infeasible ${rows}:</b> ${violationName} : <b>Line ${numbers}:</b> [${this.arrayDisplayFirstFifteen(invalidRows)}]`;
  }

  errorMsgInvalidRows(violationName, invalidRows) {
    // return a String containing the error message
    const rows = (invalidRows.length === 1) ? 'Row' : 'Rows';
    const numbers = (invalidRows.length === 1) ? 'Number' : 'Numbers';
    return `<b>${invalidRows.length} Invalid ${rows}:</b> ${violationName} : <b>Line ${numbers}:</b> [${this.arrayDisplayFirstFifteen(invalidRows)}]`;
  }

  extraValidate() {
    // returns an empty Array, indicating no errors
    // child classes may have this function defined
    return [];
  }

  formatErrorMsgArray(errorMsgArray) {
    // returns a String
    // TODO: AE: make this a static method
    return errorMsgArray.filter((item) => item !== null)
      .filter((item) => item !== undefined).join('<br>');
  }

  getPageAttributes(pageGroup, pageKey, page) {
    return {
      pageGroup,
      pageKey,
      page,
    };
  }

  // infeasibleCheck methods return noInfeasibleErrorObject when no violations are found
  //   otherwise, they return an object that contains an errorMsg describing
  //   the error and an array with row numbers for each violation
  //   additionally they return an errorListMsg for the Summary page
  // NOTE: row numbers start with 1
  // NOTE: these checks are not performant at all, and may need to be reconsidered

  infeasibleCheckMaxMustExceedMin(minTS) {
    // NOTE: this check works on absolute values of each comparison value
    if (this.length() !== minTS.length) return noInfeasibleErrorObject;
    const infeasibleRows = this.data.reduce((a, val, i) => {
      if (Math.abs(val) < Math.abs(minTS[i])) a.push(i + 1);
      return a;
    }, []);
    if (infeasibleRows.length === 0) return noInfeasibleErrorObject;
    const violationName = 'For all times, values in <b>minimum timeseries</b> must not exceed those in <b>maximum timeseries</b>';
    return {
      errorMsg: this.errorMsgInfeasibleRows(violationName, infeasibleRows),
    };
  }

  infeasibleCheckOnlyOneNonZero(otherTS) {
    if (this.length() !== otherTS.length) return noInfeasibleErrorObject;
    const infeasibleRows = this.data.reduce((a, val, i) => {
      if ((val !== 0) && (otherTS[i] !== 0)) a.push(i + 1);
      return a;
    }, []);
    if (infeasibleRows.length === 0) return noInfeasibleErrorObject;
    // TODO make this generic
    const violationName = 'For all times, values in <b>export</b> and <b>import</b> must not both be non-zero';
    return {
      errorMsg: this.errorMsgInfeasibleRows(violationName, infeasibleRows),
    };
  }

  // invalidCheck methods return noErrorObject when no violations are found
  //   otherwise, they return an object that contains an errorMsg describing
  //   the error and an array with row numbers for each violation
  // NOTE: row numbers start with 1
  // NOTE: these methods may need to be reconsidered if they hamper performance
  invalidCheckExternalData(dataYear, timestep) {
    if (!this.isMonthly && (!dataYear || !timestep)) {
      return { errorMsg: this.errorMsgMissingTimestepOrDataYear() };
    }
    return noErrorObject;
  }

  invalidCheckIsRequired() {
    if (this.data.length === 0) {
      return { errorMsg: '<b>Invalid Data:</b> These data are required.' };
    }
    return noErrorObject;
  }

  // these first 3 checks are performed for all TimeSeries and Monthly uploads
  invalidCheckRowsCount(dataYear, timestep) {
    const entriesRequired = this.isMonthly ? 12 : getNumberOfTimeStepsInYear(dataYear, timestep);
    const actualRowsCount = this.length();
    if (actualRowsCount === parseFloat(entriesRequired)) return noErrorObject;
    return {
      errorMsg: this.errorMsgInvalidData(actualRowsCount, entriesRequired),
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
  invalidCheckAtLeastOneSelected() {
    const violation = _.some(this.data, (val) => val !== 0);
    if (violation) return noErrorObject;
    return {
      errorMsg: 'At least one month must be selected',
    };
  }

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

  invalidCheckValuesDontCrossZero() {
    const firstValIndex = this.data.findIndex(val => val !== 0);
    const isSignOfFirstNonZeroValuePositive = this.data[firstValIndex] > 0;
    const invalidRows = this.data.reduce((a, val, i) => {
      const isSignOfNextNonZeroValuePositive = val > 0;
      if (val !== 0
        && isSignOfNextNonZeroValuePositive !== isSignOfFirstNonZeroValuePositive) a.push(i + 1);
      return a;
    }, []);
    if (invalidRows.length === 0) return noErrorObject;
    const firstOccurrence = invalidRows[0];
    const customErrorMsg = '<b>Invalid Data:</b> This data has both positive and negative values. It must have only positive, or only negative values as it constrains power in one direction. ';
    return {
      errorMsg: this.errorMsgInvalidDataCustom(customErrorMsg, firstOccurrence),
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

  validate(project) {
    const errorMsgArray = [];
    if (this.isRequired(project)) {
      const { dataYear, timestep } = project;
      // returns a String with any/all error messages, or an empty String
      errorMsgArray.push(this.invalidCheckExternalData(dataYear, timestep).errorMsg);
      if (_.some(errorMsgArray, null)) return this.formatErrorMsgArray(errorMsgArray);

      errorMsgArray.push(this.invalidCheckIsRequired().errorMsg);
      if (_.some(errorMsgArray, null)) return this.formatErrorMsgArray(errorMsgArray);

      errorMsgArray.push(this.invalidCheckRowsCount(project.dataYear, project.timestep).errorMsg);
      errorMsgArray.push(this.invalidCheckSingleValueNumeric().errorMsg);

      const defaultValidate = this.formatErrorMsgArray(errorMsgArray);

      // if defaultValidate has errors, then return then now
      if (defaultValidate !== '') { return defaultValidate; }
      // perform optional/specific extra validations as defined in each child class
      return this.formatErrorMsgArray(this.extraValidate(project));
    }
    return this.formatErrorMsgArray([]);
  }
}
export default DataArray;
