import FinancialInputsExternalIncentivesYear from '@/components/WizardModelComponents/FinancialInputsExternalIncentivesYear';
import mountVueElement from './helper';

describe('FinancialInputsExternalIncentivesYear', () => {
  const vm = mountVueElement(FinancialInputsExternalIncentivesYear, { incentiveId: 'null' });

  it('should render title properly', () => {
    expect(vm.$el.querySelector('h3').textContent).to.contain('External Incentives: Add Data for Year');
  });

  const numberOfInputs = 3;
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
