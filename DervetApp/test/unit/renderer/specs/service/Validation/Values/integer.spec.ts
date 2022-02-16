import integer from '@/service/Validation/Values/integer';
import { makeTestHeader } from '../../../shared';

describe('Page Reset', () => {
  makeTestHeader(' -- INTEGER VALUE VALIDATION -- ');

  const valueMetadata = {
    type: 'int',
  };

  it('should return true for a non-integer value', () => {
    const actual = integer(1.15, valueMetadata);
    expect(actual).to.eql(true);
  });

  it('should return false for an integer value', () => {
    const actual = integer(1, valueMetadata);
    expect(actual).to.eql(false);
  });

  it('should return false for an empty value', () => {
    const actual = integer(null, valueMetadata);
    expect(actual).to.eql(false);
  });
});
