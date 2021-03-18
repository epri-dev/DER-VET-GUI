import OverviewSidebar from '@/components/WizardOverview/Sidebar';
import mountVueElement from './helper';

describe('Overview-Sidebar', () => {
  const vm = mountVueElement(OverviewSidebar, {});

  const numberOfLinks = 4;
  const links = vm.$el.querySelectorAll('a');
  it(`should contain ${numberOfLinks} links`, () => {
    expect(links.length).to.equal(numberOfLinks);
  });

  const numberOfRedLinks = 3;
  const redLinks = vm.$el.querySelectorAll('a.incomplete');
  it(`should contain ${numberOfRedLinks} incomplete(red) links`, () => {
    expect(redLinks.length).to.equal(numberOfRedLinks);
  });
});
