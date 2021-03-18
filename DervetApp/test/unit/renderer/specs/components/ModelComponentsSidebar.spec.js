import ModelComponentsSidebar from '@/components/WizardModelComponents/Sidebar';
import mountVueElement from './helper';

describe('ModelComponents-Sidebar', () => {
  const vm = mountVueElement(ModelComponentsSidebar, {});

  const numberOfLinks = 6;
  const links = vm.$el.querySelectorAll('a');
  it(`should contain ${numberOfLinks} links`, () => {
    expect(links.length).to.equal(numberOfLinks);
  });

  const numberOfRedLinks = 4;
  const redLinks = vm.$el.querySelectorAll('a.incomplete');
  it(`should contain ${numberOfRedLinks} incomplete(red) links`, () => {
    expect(redLinks.length).to.equal(numberOfRedLinks);
  });
});
