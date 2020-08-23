import project from '@/store/modules/Project';

const { mutations } = project;


describe('mutations', () => {
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
});
