import NavButtons from '@/components/Shared/NavButtons';
import mountVueElement from '../helper';
import { makeTestHeader } from '../../shared';

describe('NavButtons', () => {
  makeTestHeader('-- NAV BUTTONS -- ');

  it('should render custom button text', () => {
    const testProps = {
      leftText: 'go back please',
      rightText: 'continue please',
    };
    const vm = mountVueElement(NavButtons, testProps);

    expect(vm.$el.querySelector('.left-btn').textContent).to.contain('go back please');
    expect(vm.$el.querySelector('.right-btn').textContent).to.contain('continue please');
  });

  it('should render default button text when none is provided', () => {
    const vm = mountVueElement(NavButtons, {});

    expect(vm.$el.querySelector('.left-btn').textContent).to.contain('Save');
    expect(vm.$el.querySelector('.right-btn').textContent).to.contain('Save and Continue >>');
  });

  it('should render error text when showError is true', () => {
    const testProps = {
      errorText: 'this is error',
      showError: true,
    };
    const vm = mountVueElement(NavButtons, testProps);

    expect(vm.$el.querySelector('.error-text-color').textContent).to.contain('this is error');
  });
});
