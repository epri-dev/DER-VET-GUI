import { CollectionType } from '@/models/Project/CollectionType';
import { validateCollection, formatForPageStatus } from '@/service/Validation/ValueValidationService';

import { makeTestHeader } from '../../shared';

// Add tests for each
describe('Page Reset', () => {
  makeTestHeader('-- COLLECTION VALUE VALIDATION -- ');

  const testCollection: any = [{ id: 1, values: { endTime: null, startTime: 1 } }];

  it('should validate a collection of values', () => {
    const actual = validateCollection(CollectionType.RetailTariff, testCollection);
    const expected = {
      1: { endTime: 'End Hour is required' },
    };
    expect(actual).to.eql(expected);
  });

  it('should format for page status', () => {
    const errors = {
      foo: { endTime: 'End Hour is required' },
    };
    const actual = formatForPageStatus(errors);
    const expected = {
      foo: {
        errors: { endTime: 'End Hour is required' },
        submitted: true,
      },
    };
    expect(actual).to.eql(expected);
  });
});
