import ModelComponentsSidebar from '@/components/Wizard/Components/Sidebar';
import mountVueElement from './helper';

describe('ModelComponents-Sidebar', () => {
  const vm = mountVueElement(ModelComponentsSidebar, {});

  const numberOfLinks = 7;
  const links = vm.$el.querySelectorAll('a');
  it(`should contain ${numberOfLinks} links`, () => {
    expect(links.length).to.equal(numberOfLinks);
  });

  const numberOfRedLinks = 5;
  const redLinks = vm.$el.querySelectorAll('a.incomplete');
  it(`should contain ${numberOfRedLinks} incomplete(red) links`, () => {
    expect(redLinks.length).to.equal(numberOfRedLinks);
  });
});
