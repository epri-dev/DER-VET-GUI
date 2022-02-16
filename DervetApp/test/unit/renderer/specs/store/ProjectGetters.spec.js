import project from '@/store/modules/Project';
import CollectionTypes from '@/models/Project/CollectionTypes.ts';
import { makeTestHeader } from '../shared';

const { getters } = project;

describe('Project Getters', () => {
  makeTestHeader('-- PROJECT GETTERS --');

  it('should get index of list item by ID', () => {
    const id = 'e4ccd19f-0f3c-49ef-a955-bf063687982d';
    const solarItem = { id, name: 'solar1' };
    const state = { technologySpecsSolarPV: [solarItem] };

    const actual = getters.getCollectionItemById(state)(CollectionTypes.SolarPV, id);

    expect(actual).to.equal(solarItem);
  });

  it('should return a collection clone', () => {
    const id = 'e4ccd19f-0f3c-49ef-a955-bf063687982d';
    const solarSpec = [{ id, name: 'solar1' }];
    const state = { technologySpecsSolarPV: solarSpec };

    const actual = getters.getCollectionClone(state)(CollectionTypes.SolarPV);

    expect(actual).to.eql(solarSpec);
  });

  it('should return an index of a collection given the ID', () => {
    const id = 'e4ccd19f-0f3c-49ef-a955-bf063687982d';
    const solarSpec = { id, name: 'solar1' };
    const state = { technologySpecsSolarPV: [solarSpec] };

    const actual = getters.getIndexOfCollectionItemById(state)(CollectionTypes.SolarPV, id);

    expect(actual).to.eql(0);
  });
});
