import { CsvRowValidator } from '@/util/validation';
import { makeTestHeader } from '../shared';

describe('util/application', () => {
  makeTestHeader('-- FILE UTIL -- ');

  const badData = [[1, 2], [2, 5], [1, null], [2]];

  it('should create an invalid row length error message', () => {
    const validator = new CsvRowValidator(badData);
    const actual = validator.getErrorMessage();
    const expected = '<b>Import Error</b>: Each row must have just 1 value: <b>Line Numbers</b>: 1,2';
    expect(actual).to.eql(expected);
  });

  it('should return invalid when invalid', () => {
    const validator1 = new CsvRowValidator([[1], [2]]);
    const validator2 = new CsvRowValidator(badData);
    expect(validator1.isInvalid()).to.eql(false);
    expect(validator2.isInvalid()).to.eql(true);
  });
});
