import { between } from '@/service/Validation/Values/index';
import { makeTestHeader } from '../../../shared';

describe('Page Reset', () => {
  makeTestHeader(' -- BETWEEN VALUE VALIDATION -- ');

  const valueMetadata = {
    type: 'foo',
    minValue: 1,
    maxValue: 5,
  };

  it('should return false when value is between min and max', () => {
    const actual = between(3, valueMetadata, {});
    expect(actual).to.eql(false);
  });

  it('should return false when value is between min and max', () => {
    const actual = between(0, valueMetadata, {});
    expect(actual).to.eql(true);
  });

  it('should return false when value is between min and max', () => {
    const actual = between(6, valueMetadata, {});
    expect(actual).to.eql(true);
  });
});
