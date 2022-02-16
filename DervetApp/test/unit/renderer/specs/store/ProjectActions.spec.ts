import Vuex from 'vuex';

import Project from '@/store/modules/Project';
import * as a from '@/store/actionTypes';
import { LocType } from '@/models/Project/Metadata/TechnologySpecs/SolarPV';
import CollectionTypes from '@/models/Project/CollectionTypes';

const createStore = (state: any) => (new Vuex.Store({
  modules: {
    project: {
      state,
      actions: Project.actions,
      getters: Project.getters,
      mutations: Project.mutations,
    },
  },
}));

describe('project actions', () => {
  it('should update loc value in PVs to null when first battery added to project', async () => {
    const initialState: any = {
      technologySpecsBattery: [],
      technologySpecsSolarPV: [{ values: { loc: LocType.AC } }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.ADD_COLLECTION_ITEM, { collectionType: CollectionTypes.Battery, contents: 'foo' });
    expect(store.state.project.technologySpecsSolarPV[0].values.loc).to.eql(null);
  });

  it('should update loc value in PVs to null when first battery is activated', async () => {
    const initialState: any = {
      technologySpecsBattery: [{ id: '123', active: false }],
      technologySpecsSolarPV: [{ values: { loc: LocType.AC } }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.ACTIVATE_TECH, { collectionType: CollectionTypes.Battery, id: '123' });
    expect(store.state.project.technologySpecsSolarPV[0].values.loc).to.eql(null);
  });

  it('should update loc value in PVs to AC when last battery is removed from project', async () => {
    const initialState: any = {
      technologySpecsBattery: [{ id: '123', active: true }, { id: '456', active: true }],
      technologySpecsSolarPV: [{ id: 'foo', values: { loc: LocType.DC } }],
    };
    const store: any = createStore(initialState);
    await store.dispatch(a.REMOVE_COLLECTION_ITEM, { collectionType: CollectionTypes.Battery, id: '123' });
    expect(store.state.project.technologySpecsSolarPV[0].values.loc).to.eql(LocType.DC);
    await store.dispatch(a.REMOVE_COLLECTION_ITEM, { collectionType: CollectionTypes.Battery, id: '456' });
    expect(store.state.project.technologySpecsSolarPV[0].values.loc).to.eql(LocType.AC);
  });

  it('should update loc value in PVs to AC when all batteries are deactivated', async () => {
    const initialState: any = {
      technologySpecsBattery: [{ id: '123', active: true }, { id: '456', active: true }],
      technologySpecsSolarPV: [{ id: 'foo', values: { loc: LocType.DC } }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.DEACTIVATE_TECH, { collectionType: CollectionTypes.Battery, id: '123' });
    expect(store.state.project.technologySpecsSolarPV[0].values.loc).to.eql(LocType.DC);
    await store.dispatch(a.DEACTIVATE_TECH, { collectionType: CollectionTypes.Battery, id: '456' });
    expect(store.state.project.technologySpecsSolarPV[0].values.loc).to.eql(LocType.AC);
  });

  it('should update gamma and nu values in PVs when Reliability Service is selected (a)', async () => {
    // starting with an errorList that has 2 items, this should add 2 more to make 4
    // starting with a non-null complete, complete should update to false
    const initialState: any = {
      technologySpecsSolarPV: [{ values: { gamma: 44, nu: 22 } }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.RESET_GAMMA_AND_NU, true);
    expect(store.state.project.technologySpecsSolarPV[0].values.gamma).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].values.nu).to.eql(null);
  });

  it('should update gamma and nu values in PVs when Reliability Service is deselected (b)', async () => {
    // starting with an errorList that has 0 items, this action only removes
    //   items from errorList, so that errorList is unchanged
    // starting with a non-null complete, complete should update to true
    const initialState: any = {
      technologySpecsSolarPV: [{
        values: { gamma: 44, nu: 22 },
      }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.RESET_GAMMA_AND_NU, false);
    expect(store.state.project.technologySpecsSolarPV[0].values.gamma).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].values.nu).to.eql(null);
  });
});
