import FinancialInputsRetailTariffImport from '@/components/WizardModelComponents/FinancialInputsRetailTariffImport';
import mountVueElement from './helper';

describe('FinancialInputsRetailTariffImport', () => {
  it('should render properly', () => {
    const vm = mountVueElement(FinancialInputsRetailTariffImport, {});
    expect(vm.$el.querySelector('h3').textContent).to.contain('Import Retail Tariff');
  });
});
