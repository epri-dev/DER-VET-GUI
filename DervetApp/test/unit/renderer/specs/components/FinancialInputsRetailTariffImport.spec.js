import FinancialInputsRetailTariffImport from '@/components/WizardModelComponents/FinancialInputsRetailTariffImport';
import mountVueElement from './helper';

describe('FinancialInputsRetailTariffImport', () => {
  const vm = mountVueElement(FinancialInputsRetailTariffImport, {});

  it('should render title properly', () => {
    expect(vm.$el.querySelector('h3').textContent).to.contain('Import Retail Tariff');
  });
  it('should contain 1 file input element', () => {
    const inputFiles = vm.$el.querySelectorAll("input[type='file']");
    expect(inputFiles.length).to.equal(1);
  });
  it('should not contain any error text', () => {
    const errorText = vm.$el.querySelector('.error-text-color');
    expect(errorText.textContent).to.equal('');
  });
});
