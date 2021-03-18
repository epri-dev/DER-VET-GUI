import _ from 'lodash';

const getNumberOfInvalidRows = (rows: object[]) => {
  // returns a number
  const invalidRowsCount = _.filter(rows, { complete: false }).length;
  return invalidRowsCount;
};

export const compileImportNotes = (importNotes: string[], file: string) => {
  // adds a line to importNotes that indicates the source file
  const sourceFileString = `source: ${file}`;
  importNotes.push(sourceFileString);
  return importNotes;
};

export const getSingleErrorMsg = (rows: object[], name: string) => {
  // returns a string
  if (rows.length === 0) {
    return `There are no ${name} specified`;
  }
  const invalidRowsCount = getNumberOfInvalidRows(rows);
  if (invalidRowsCount === 0) {
    return '';
  }
  const pluralizeRow = (invalidRowsCount === 1) ? '' : 's';
  return `There are errors with ${invalidRowsCount} row${pluralizeRow} in the table`;
};
