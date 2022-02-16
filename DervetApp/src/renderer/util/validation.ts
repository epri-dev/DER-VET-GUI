import _ from 'lodash';

export const validateCsvHeaders = (rows: any[][], headers: string[]): string => {
  const headerRow = rows[0];
  const areHeadersCorrect = _.isEqual(headerRow, headers);
  const headerError = `CSV headers are incorrect: should be ${headers.join(',')}`;
  return areHeadersCorrect ? null : headerError;
};

export const validateCsvRowLength = (
  rows: any[][], expectedRowLength: number,
): string => {
  const areRowsCorrectLength = _.every(rows, (row: any[]) => row.length === expectedRowLength);
  const rowLengthError = `Some rows did not have the expected number of data columns: expected ${expectedRowLength}`;
  return areRowsCorrectLength ? null : rowLengthError;
};

export const empty = (x: any) => (x === null || x === '' || x === undefined);

export const nonEmpty = (x: any) => !empty(x);

export const valueInHourRange = (value: number) => _.inRange(value, 1, 25);

export const valueInMonthRange = (value: number) => _.inRange(value, 1, 13);

export class CsvRowValidator {
  invalidRowIndexes: number[];

  constructor(data: number[][]) {
    this.invalidRowIndexes = this.getInvalidRowIndices(data);
  }

  isInvalid(): boolean {
    return this.invalidRowIndexes.length > 0;
  }

  getErrorMessage(): string {
    const slice = this.invalidRowIndexes.slice(0, 15);
    const fmt = _.join((this.invalidRowIndexes.length <= 15) ? slice : [slice, '...']);
    return this.isInvalid() ? `<b>Import Error</b>: Each row must have just 1 value: <b>Line Numbers</b>: ${fmt}` : null;
  }

  private getInvalidRowIndices(data: number[][]): number[] {
    return _.reduce(data, (acc, row, idx) => {
      if (this.isInvalidRow(row)) { acc.push(idx + 1); }
      return acc;
    }, []);
  }

  private isInvalidRow(row: number[]): boolean {
    return row.length > 1 && _.some(_.tail(row), i => i !== null);
  }
}
