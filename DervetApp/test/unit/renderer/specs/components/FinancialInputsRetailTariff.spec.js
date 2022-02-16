import Main from '@/components/Wizard/Components/Financial/RetailTariff/Main';
import mountVueElement from './helper';

describe('Retail Tariff Main', () => {
  const vm = mountVueElement(Main, {});

  it('should render title properly', () => {
    expect(vm.$el.querySelector('h3').textContent).to.contain('Retail Tariff');
  });
  it('should contain an .error-text-color class element with specific text', () => {
    expect(vm.$el.querySelector('.error-text-color').textContent).to.contain('There are no billing periods specified');
  });
});
