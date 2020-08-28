import FinancialInputsExternalIncentives from '@/components/Wizard/FinancialInputsExternalIncentives';
import mountVueElement from './helper';

describe('FinancialInputsExternalIncentives', () => {
  it('should render properly', () => {
    const vm = mountVueElement(FinancialInputsExternalIncentives, {});
    expect(vm.$el.querySelector('h3').textContent).to.contain('External Incentives');
  });
});
