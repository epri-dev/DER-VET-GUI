import FinancialInputsExternalIncentivesImport from '@/components/Wizard/FinancialInputsExternalIncentivesImport';
import mountVueElement from './helper';

describe('FinancialInputsExternalIncentivesImport', () => {
  it('should render properly', () => {
    const vm = mountVueElement(FinancialInputsExternalIncentivesImport, {});
    expect(vm.$el.querySelector('h3').textContent).to.contain('Import External Incentives');
  });
});
