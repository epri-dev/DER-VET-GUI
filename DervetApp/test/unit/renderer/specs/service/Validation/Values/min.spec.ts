import { min } from '@/service/Validation/Values/index';
import { makeTestHeader } from '../../../shared';

describe('Page Reset', () => {
  makeTestHeader(' -- MIN VALUE VALIDATION -- ');

  const valueMetadata1 = {
    type: 'foo',
    minValue: 1,
  };
  const valueMetadata2 = {
    type: 'bar',
    minValueIf: { field: 'endTime', condition: (x: boolean) => (x ? 1 : 10) },
  };

  it('should return true for a value less than the minValue specified', () => {
    const actual = min(0, valueMetadata1, {});
    expect(actual).to.eql(true);
  });

  it('should return false for a value equal to the minValue specified', () => {
    const actual = min(1, valueMetadata1, {});
    expect(actual).to.eql(false);
  });

  it('should return false for a value greater than the minValue specified', () => {
    const actual = min(4, valueMetadata1, {});
    expect(actual).to.eql(false);
  });

  it('should return true for a value greater than the minValueIf specified', () => {
    const actual = min(4, valueMetadata2, { endTime: false });
    expect(actual).to.eql(true);
  });

  it('should return true for a value greater than the minValueIf specified', () => {
    const actual = min(4, valueMetadata2, { endTime: true });
    expect(actual).to.eql(false);
  });
});
