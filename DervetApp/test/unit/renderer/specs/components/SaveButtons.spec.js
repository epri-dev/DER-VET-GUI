import SaveButtons from '@/components/Shared/SaveButtons';
import mountVueElement from './helper';

describe('SaveButtons', () => {
  it('should render custom button text', () => {
    const testProps = {
      continueLink: 'b',
      continueText: 'continue please',
      save: () => 'c',
    };
    const vm = mountVueElement(SaveButtons, testProps);

    expect(vm.$el.querySelector('.continue-btn').textContent).to.contain('continue please');
  });

  it('should render default button text when none is provided', () => {
    const testProps = {
      continueLink: 'b',
      save: () => 'c',
    };
    const vm = mountVueElement(SaveButtons, testProps);

    expect(vm.$el.querySelector('.continue-btn').textContent).to.contain('Save and Continue >>');
  });

  it('should render error text when displayError is true', () => {
    const testProps = {
      continueLink: 'b',
      save: () => 'c',
      displayError: true,
    };
    const vm = mountVueElement(SaveButtons, testProps);

    expect(vm.$el.querySelector('.error-text-color').textContent).to.contain(' errors ');
  });
});
