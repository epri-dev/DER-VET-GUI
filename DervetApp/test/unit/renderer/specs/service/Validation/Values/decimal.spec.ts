import RetailTariffBillingPeriodMetadata from '@/models/Project/Metadata/Finances/RetailTariffBillingPeriod';
import decimal from '@/service/Validation/Values/decimal';
import { makeTestHeader } from '../../../shared';

describe('Page Reset', () => {
  makeTestHeader(' -- DECIMAL VALUE VALIDATION -- ');

  const metadata = new RetailTariffBillingPeriodMetadata();

  it('should return false for a decimal value', () => {
    const actual = decimal(1.15, metadata.value);
    expect(actual).to.eql(false);
  });

  it('should return false for an integer too', () => {
    const actual = decimal(1, metadata.value);
    expect(actual).to.eql(false);
  });
});
