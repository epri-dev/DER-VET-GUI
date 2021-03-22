import Vuex from 'vuex';

import Project from '@/store/modules/Project';
import * as a from '@/store/actionTypes';
import { LocType } from '@/models/Project/TechnologySpecs/TechnologySpecsSolarPV';

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
      technologySpecsSolarPV: [{ loc: LocType.AC }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.ADD_TECH, { tag: 'Battery', contents: 'foo' });
    expect(store.state.project.technologySpecsSolarPV[0].loc).to.eql(null);
  });

  it('should update loc value in PVs to null when first battery is activated', async () => {
    const initialState = {
      technologySpecsBattery: [{ tag: 'Battery', id: '123', active: false }],
      technologySpecsSolarPV: [{ loc: LocType.AC }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.ACTIVATE_TECH, { tag: 'Battery', id: '123' });
    expect(store.state.project.technologySpecsSolarPV[0].loc).to.eql(null);
  });

  it('should update loc value in PVs to AC when last battery is removed from project', async () => {
    const initialState = {
      technologySpecsBattery: [{ id: '123', active: true }, { id: '456', active: true }],
      technologySpecsSolarPV: [{ loc: LocType.DC }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.REMOVE_TECH, { tag: 'Battery', id: '123' });
    expect(store.state.project.technologySpecsSolarPV[0].loc).to.eql(LocType.DC);
    await store.dispatch(a.REMOVE_TECH, { tag: 'Battery', id: '456' });
    expect(store.state.project.technologySpecsSolarPV[0].loc).to.eql(LocType.AC);
  });

  it('should update loc value in PVs to AC when all batteries are deactivated', async () => {
    const initialState = {
      technologySpecsBattery: [{ id: '123', active: true }, { id: '456', active: true }],
      technologySpecsSolarPV: [{ loc: LocType.DC }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.DEACTIVATE_TECH, { tag: 'Battery', id: '123' });
    expect(store.state.project.technologySpecsSolarPV[0].loc).to.eql(LocType.DC);
    await store.dispatch(a.DEACTIVATE_TECH, { tag: 'Battery', id: '456' });
    expect(store.state.project.technologySpecsSolarPV[0].loc).to.eql(LocType.AC);
  });
});
