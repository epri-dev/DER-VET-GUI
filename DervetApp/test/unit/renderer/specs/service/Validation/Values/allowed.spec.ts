import { allowed } from '@/service/Validation/Values/index';
import { makeTestHeader } from '../../../shared';

describe('Page Reset', () => {
  makeTestHeader(' -- ALLOWED VALUE VALIDATION -- ');

  const valueMetadata = {
    type: 'foo',
    allowedValues: [{ value: 1 }, { value: 2 }],
  };

  it('should return false for a value in allowed values', () => {
    const actual = allowed(1, valueMetadata);
    expect(actual).to.eql(false);
  });

  it('should return true for a value not in allowed values', () => {
    const actual = allowed(3, valueMetadata);
    expect(actual).to.eql(true);
  });
});
