import RetailTariffBillingPeriodMetadata from '@/models/Project/Metadata/Finances/RetailTariffBillingPeriod';
import required from '@/service/Validation/Values/required';
import { makeTestHeader } from '../../../shared';

describe('Page Reset', () => {
  makeTestHeader(' -- REQUIRED VALUE VALIDATION -- ');

  const metadata = new RetailTariffBillingPeriodMetadata();

  it('should return true for an empty value that is required', () => {
    const actual = required(null, metadata.startTime, {});
    expect(actual).to.eql(true);
  });

  it('should return false for an valid value that is required', () => {
    const actual = required(1, metadata.startTime, {});
    expect(actual).to.eql(false);
  });

  it('should return true for an invalid value that is required dependent on another field', () => {
    const collection = { excludingEndTime: 10 };
    const actual = required(null, metadata.excludingStartTime, collection);
    expect(actual).to.eql(true);
  });

  it('should return false for a valid value that is required dependent on another field', () => {
    const collection = { excludingEndTime: 10 };
    const actual = required(1, metadata.excludingStartTime, collection);
    expect(actual).to.eql(false);
  });
});
