import FinancialInputsRetailTariff from '@/components/WizardModelComponents/FinancialInputsRetailTariff';
import mountVueElement from './helper';

describe('FinancialInputsRetailTariff', () => {
  const vm = mountVueElement(FinancialInputsRetailTariff, {});

  it('should render title properly', () => {
    expect(vm.$el.querySelector('h3').textContent).to.contain('Retail Tariff');
  });
  it('should contain an .error-text-color class element with specific text', () => {
    expect(vm.$el.querySelector('.error-text-color').textContent).to.contain('There are no billing periods specified');
  });
});
