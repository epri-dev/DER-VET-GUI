import NavButtons from '@/components/Shared/NavButtons';
import mountVueElement from './helper';

describe('NavButtons', () => {
  it('should render custom button text', () => {
    const testProps = {
      backLink: 'a',
      backText: 'go back please',
      continueLink: 'b',
      continueText: 'continue please',
      save: () => 'c',
    };
    const vm = mountVueElement(NavButtons, testProps);

    expect(vm.$el.querySelector('.back-btn').textContent).to.contain('go back please');
    expect(vm.$el.querySelector('.continue-btn').textContent).to.contain('continue please');
  });

  it('should render default button text when none is provided', () => {
    const testProps = {
      backLink: 'a',
      continueLink: 'b',
      save: () => 'c',
    };
    const vm = mountVueElement(NavButtons, testProps);

    expect(vm.$el.querySelector('.back-btn').textContent).to.contain('<< Back');
    expect(vm.$el.querySelector('.continue-btn').textContent).to.contain('Continue >>');
  });
});
