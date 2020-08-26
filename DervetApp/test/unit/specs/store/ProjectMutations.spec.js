import project from '@/store/modules/Project';

const { mutations } = project;


describe('project mutations', () => {
  it('should set project ID', () => {
    const state = { id: null };
    const newId = 'e4ccd19f-0f3c-49ef-a955-bf063687982d';

    mutations.SET_ID(state, newId);

    expect(state.id).to.equal(newId);
  });

  it('should remove all billing periods', () => {
    const state = { retailTariffBillingPeriods: ['test'] };

    mutations.REMOVE_ALL_RETAIL_TARIFF_BILLING_PERIODS(state);

    expect(state.retailTariffBillingPeriods).to.have.lengthOf(0);
  });

  it('should add a new billing period', () => {
    const state = { retailTariffBillingPeriods: [] };
    const newBillingPeriod = { startTime: 0, endTime: 12 };

    mutations.ADD_RETAIL_TARIFF_BILLING_PERIOD(state, newBillingPeriod);

    expect(state.retailTariffBillingPeriods).to.have.lengthOf(1);
    expect(state.retailTariffBillingPeriods[0]).to.equal(newBillingPeriod);
  });

  it('should remove a single billing period', () => {
    const bp1 = { id: '4747', startTime: 0, endTime: 12 };
    const bp2 = { id: '50505', startTime: 2, endTime: 3 };
    const state = { retailTariffBillingPeriods: [bp1, bp2] };

    mutations.REMOVE_RETAIL_TARIFF_BILLING_PERIOD(state, '4747');

    expect(state.retailTariffBillingPeriods).to.have.lengthOf(1);
    expect(state.retailTariffBillingPeriods[0]).to.equal(bp2);
  });
});
