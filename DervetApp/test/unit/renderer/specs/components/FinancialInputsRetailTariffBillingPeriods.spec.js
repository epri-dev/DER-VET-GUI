import FinancialInputsRetailTariffBillingPeriod from '@/components/WizardModelComponents/FinancialInputsRetailTariffBillingPeriod';
import mountVueElement from './helper';

describe('FinancialInputsRetailTariffBillingPeriod', () => {
  const vm = mountVueElement(FinancialInputsRetailTariffBillingPeriod, { billingPeriodId: 'null' });

  it('should render title properly', () => {
    expect(vm.$el.querySelector('h3').textContent).to.contain('Retail Tariff: Add Billing Period');
  });

  const numberOfInputs = 13;
  it(`should contain ${numberOfInputs} input elements`, () => {
    const inputs = vm.$el.querySelectorAll('input');
    expect(inputs.length).to.equal(numberOfInputs);
  });
  it('should not contain invalid input elements', () => {
    expect(vm.$el.querySelector('input.is-invalid')).to.equal(null);
  });
  it('should not contain .invalid-feedback class', () => {
    expect(vm.$el.querySelector('.invalid-feedback')).to.equal(null);
  });
  it('should not contain an .error-text-color class', () => {
    expect(vm.$el.querySelector('.error-text-color')).to.equal(null);
  });
});
