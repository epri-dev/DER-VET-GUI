export const xcompileImportNotes = (importNotes: Array<string>, file: string) => {
  // adds a line to importNotes that indicates the source file
  const sourceFileString = `source: ${file}`;
  importNotes.push(sourceFileString);
  return importNotes;
}

export const xgetSingleErrorMsg = (rows: Array<object>, name: string) => {
  // returns a string
  if (rows.length === 0) {
    return `There are no ${name} specified`;
  }
  const invalidRowsCount = xgetNumberOfInvalidRows(rows);
  if (invalidRowsCount === 0) {
    return '';
  }
  const pluralizeRow = (invalidRowsCount === 1) ? '' : 's';
  return `There are errors with ${invalidRowsCount} row${pluralizeRow} in the table`;
}

export const xgetNumberOfInvalidRows = (rows: object) => {
  // returns a number
  let invalidRowsCount = 0;
  Object.values(rows).forEach((row) => {
    if (!row.complete) {
      invalidRowsCount += 1;
    }
  });
  return invalidRowsCount;
}
