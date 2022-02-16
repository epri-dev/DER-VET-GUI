import Main from '@/components/Wizard/Components/Financial/ExternalIncentives/Main';
import mountVueElement from './helper';

describe('External Incentives Main', () => {
  const vm = mountVueElement(Main, {});

  it('should render title properly', () => {
    expect(vm.$el.querySelector('h3').textContent).to.contain('External Incentives');
  });

  it('should not contain an .error-text-color class element', () => {
    expect(vm.$el.querySelector('.error-text-color')).to.equal(null);
  });
});
