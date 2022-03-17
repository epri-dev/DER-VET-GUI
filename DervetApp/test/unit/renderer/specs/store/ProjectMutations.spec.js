import project from '@/store/modules/Project';
import { CollectionType } from '@/models/Project/CollectionType.ts';
import { makeTestHeader } from '../shared';

const { mutations } = project;

describe('Project Mutations', () => {
  makeTestHeader('-- PROJECT MUTATIONS --');

  it('should remove a collection item', () => {
    const state = {
      technologySpecsSolarPV: [{
        id: 'foo',
        values: {
          name: 'my pv',
        },
      }],
    };
    const payload = {
      collectionType: CollectionType.SolarPV,
      id: 'foo',
    };
    mutations.REMOVE_COLLECTION_ITEM(state, payload);
    expect(state.technologySpecsSolarPV.length).to.equal(0);
  });

  it('should remove all collection items', () => {
    const state = {
      technologySpecsSolarPV: [{
        id: 'foo',
        values: {
          name: 'my pv',
        },
      }],
    };
    mutations.REMOVE_ALL_COLLECTION_ITEMS(state, CollectionType.SolarPV);
    expect(state.technologySpecsSolarPV).to.have.lengthOf(0);
  });

  it('should add a collection item', () => {
    const state = { technologySpecsSolarPV: [] };
    const payload = {
      collectionType: CollectionType.SolarPV,
      id: 'foo',
      values: { name: 'pv' },
    };
    mutations.ADD_COLLECTION_ITEM(state, payload);
    const expected = [{
      id: 'foo',
      active: true,
      values: { name: 'pv' },
    }];
    expect(state.technologySpecsSolarPV).to.eql(expected);
  });

  it('should replace a set of technology specs', () => {
    const state = {
      technologySpecsSolarPV: [{
        id: 'foo',
        values: {
          name: 'oldPV',
        },
      }],
    };
    const payload = {
      collectionType: CollectionType.SolarPV,
      id: 'foo',
      values: {
        name: 'newPV',
      },
    };

    mutations.REPLACE_COLLECTION_ITEM(state, payload);
    expect(state.technologySpecsSolarPV[0].values.name).to.equal('newPV');
  });

  it('should set project ID', () => {
    const state = { id: null };
    const newId = 'e4ccd19f-0f3c-49ef-a955-bf063687982d';

    mutations.SET_VALUE(state, { key: 'id', value: newId });

    expect(state.id).to.equal(newId);
  });

  // TODO the functionality for both of these tests now lives in "resetAllNonRequired"
  //      in Objectives.vue; the logic in resetAllNonRequired for all components will
  //      eventually live in a separate, standalone, and testable function/module

  // it('should set retail and wholesale booleans accordingly when true', () => {
  //   const state = { objectivesDA: false, tsDaPrice: {} };

  //   mutations.CHOOSE_ENERGY_STRUCTURE(state, true);

  //   expect(state.objectivesDA).to.equal(true);
  //   expect(state.objectivesRetailEnergyChargeReduction).to.equal(false);
  //   expect(state.energyPriceSourceWholesale).to.equal(true);
  //   expect(state.tsDaPrice.required).to.equal(true);
  // });

  // it('should set retail and wholesale booleans accordingly when false', () => {
  //   const state = { objectivesDA: true, tsDaPrice: {} };

  //   mutations.CHOOSE_ENERGY_STRUCTURE(state, false);

  //   expect(state.objectivesDA).to.equal(false);
  //   expect(state.objectivesRetailEnergyChargeReduction).to.equal(true);
  //   expect(state.energyPriceSourceWholesale).to.equal(false);
  //   expect(state.tsDaPrice.required).to.equal(false);
  // });
});
