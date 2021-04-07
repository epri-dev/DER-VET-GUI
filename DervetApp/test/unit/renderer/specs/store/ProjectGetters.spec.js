import project from '@/store/modules/Project';

const { getters } = project;

describe('project getters', () => {
  it('should get index of solar by ID', () => {
    const solarId = 'e4ccd19f-0f3c-49ef-a955-bf063687982d';
    const state = { technologySpecsSolarPV: [{ id: solarId, name: 'solar1' }] };

    const index = getters.getIndexOfListFieldById(state)('technologySpecsSolarPV', solarId);

    expect(index).to.equal(0);
  });

  it('should get index of list item by ID', () => {
    const solarId = 'e4ccd19f-0f3c-49ef-a955-bf063687982d';
    const solarItem = { id: solarId, name: 'solar1' };
    const state = { technologySpecsSolarPV: [solarItem] };

    const actual = getters.getListFieldById(state)('technologySpecsSolarPV', solarId);

    expect(actual).to.equal(solarItem);
  });
});
