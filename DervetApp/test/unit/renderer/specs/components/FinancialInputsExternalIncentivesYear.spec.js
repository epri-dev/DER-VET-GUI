import FinancialInputsExternalIncentivesYear from '@/components/WizardModelComponents/FinancialInputsExternalIncentivesYear';
import mountVueElement from './helper';

describe('FinancialInputsExternalIncentivesYear', () => {
  it('should render properly', () => {
    const vm = mountVueElement(FinancialInputsExternalIncentivesYear, { incentiveId: 'null' });
    expect(vm.$el.querySelector('h3').textContent).to.contain('External Incentives: Add Data for Year');
  });
});
