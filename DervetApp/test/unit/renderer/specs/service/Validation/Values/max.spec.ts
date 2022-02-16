import { max } from '@/service/Validation/Values/index';
import { makeTestHeader } from '../../../shared';

describe('Page Reset', () => {
  makeTestHeader(' -- MAX VALUE VALIDATION -- ');

  const valueMetadata1 = {
    type: 'foo',
    maxValue: 1,
  };
  const valueMetadata2 = {
    maxValueIf: { field: 'endTime', condition: (x: boolean) => (x ? 1 : 10) },
    type: 'bar',
  };

  it('should return false for a value less than the max value specified', () => {
    const actual = max(0, valueMetadata1, {});
    expect(actual).to.eql(false);
  });

  it('should return false for a value equal to the max value specified', () => {
    const actual = max(1, valueMetadata1, {});
    expect(actual).to.eql(false);
  });

  it('should return true for a value greater than the max value specified', () => {
    const actual = max(2, valueMetadata1, {});
    expect(actual).to.eql(true);
  });

  it('should return true for a value greater than the maxValueIf specified', () => {
    const actual = max(5, valueMetadata2, { endTime: true });
    expect(actual).to.eql(true);
  });

  it('should return false for a value less than the max maxValueIf specified', () => {
    const actual = max(5, valueMetadata2, { endTime: false });
    expect(actual).to.eql(false);
  });
});
