import FinancialInputsExternalIncentives from '@/components/WizardModelComponents/FinancialInputsExternalIncentives';
import mountVueElement from './helper';

describe('FinancialInputsExternalIncentives', () => {
  const vm = mountVueElement(FinancialInputsExternalIncentives, {});

  it('should render title properly', () => {
    expect(vm.$el.querySelector('h3').textContent).to.contain('External Incentives');
  });
  it('should not contain an .error-text-color class element', () => {
    expect(vm.$el.querySelector('.error-text-color')).to.equal(null);
  });
});
