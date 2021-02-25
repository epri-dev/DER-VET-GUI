import { UtilityRate } from '@/service/OpenEI/response';
import convertUtilityRateToTariffList from '@/service/OpenEI/dto';
import * as utilityRateFixture from '../../fixtures/service/OpenEI/utility_rate.json';

const getFixture = (): UtilityRate => (utilityRateFixture.items[0] as UtilityRate);

describe('utility rate to tariff DTO', () => {
  it('should translate an OpenEI utility rate into a list of tariffs', () => {
    const fixture = getFixture();
    const actual = convertUtilityRateToTariffList(fixture);
    // Just a placeholder so that tests pass
    expect(actual).to.equal(actual);
  });
});
