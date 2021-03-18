import FinancialInputsExternalIncentivesImport from '@/components/WizardModelComponents/FinancialInputsExternalIncentivesImport';
import mountVueElement from './helper';

describe('FinancialInputsExternalIncentivesImport', () => {
  const vm = mountVueElement(FinancialInputsExternalIncentivesImport, {});

  it('should render title properly', () => {
    expect(vm.$el.querySelector('h3').textContent).to.contain('Import External Incentives');
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
