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

  it('should update gamma and nu values in PVs when Reliability Service is selected (a)', async () => {
    // starting with an errorList that has 2 items, this should add 2 more to make 4
    // starting with a non-null complete, complete should update to false
    const initialState: any = {
      technologySpecsSolarPV: [{ gamma: 44, nu: 22, errorList: ['abc', 'def'] }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.RESET_GAMMA_AND_NU, true);
    expect(store.state.project.technologySpecsSolarPV[0].gamma).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].nu).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].errorList.length).to.eql(4);
    expect(store.state.project.technologySpecsSolarPV[0].complete).to.eql(false);
  });

  it('should update gamma and nu values in PVs when Reliability Service is selected (b)', async () => {
    // starting with a value of null for complete, indicating that this service was
    //   selected, but not started/saved, this action should NOT update complete or errorList
    const initialState: any = {
      technologySpecsSolarPV: [{ gamma: 44, nu: 22, errorList: [], complete: null }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.RESET_GAMMA_AND_NU, true);
    expect(store.state.project.technologySpecsSolarPV[0].gamma).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].nu).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].errorList.length).to.eql(0);
    expect(store.state.project.technologySpecsSolarPV[0].complete).to.eql(null);
  });

  it('should update gamma and nu values in PVs when Reliability Service is selected (c)', async () => {
    // starting with an errorList that has 1 item, but the item is the errorMsg is for gamma,
    //   this should remove that errorMsg, and then add 2 more to make 2 in errorList
    // starting with a non-null complete, complete should update to false
    // since componentSpecsComplete exists, that is also updated to false
    const initialState: any = {
      technologySpecsSolarPV: [{
        gamma: 44,
        nu: 22,
        errorList: ['Timestep Percentage of PV Minimum Generation is reqd'],
        componentSpecsComplete: true,
        associatedInputsComplete: true,
      }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.RESET_GAMMA_AND_NU, true);
    expect(store.state.project.technologySpecsSolarPV[0].gamma).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].nu).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].errorList.length).to.eql(2);
    expect(store.state.project.technologySpecsSolarPV[0].complete).to.eql(false);
    expect(store.state.project.technologySpecsSolarPV[0].componentSpecsComplete).to.eql(false);
  });

  it('should update gamma and nu values in PVs when Reliability Service is deselected (a)', async () => {
    // starting with an errorList that has 0 items, this action only removes
    //   items from errorList, so that errorList is unchanged
    // starting with a non-null complete, complete should update to true
    const initialState: any = {
      technologySpecsSolarPV: [{ gamma: 44, nu: 22, errorList: [] }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.RESET_GAMMA_AND_NU, false);
    expect(store.state.project.technologySpecsSolarPV[0].gamma).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].nu).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].errorList.length).to.eql(0);
    expect(store.state.project.technologySpecsSolarPV[0].complete).to.eql(true);
  });

  it('should update gamma and nu values in PVs when Reliability Service is deselected (b)', async () => {
    // starting with a value of null for complete, indicating that this service was
    //   selected, but not started/saved, this action should NOT update complete or errorList
    const initialState: any = {
      technologySpecsSolarPV: [{ gamma: 44, nu: 22, errorList: [], complete: null }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.RESET_GAMMA_AND_NU, false);
    expect(store.state.project.technologySpecsSolarPV[0].gamma).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].nu).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].errorList.length).to.eql(0);
    expect(store.state.project.technologySpecsSolarPV[0].complete).to.eql(null);
  });

  it('should update gamma and nu values in PVs when Reliability Service is deselected (c)', async () => {
    // starting with an errorList that has 1 item, this action only removes
    //   gamma and nu items from errorList, so that this errorList is unchanged
    // starting with a non-null complete, complete should update to false
    const initialState: any = {
      technologySpecsSolarPV: [{ gamma: 44, nu: 22, errorList: ['abc'] }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.RESET_GAMMA_AND_NU, false);
    expect(store.state.project.technologySpecsSolarPV[0].gamma).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].nu).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].errorList.length).to.eql(1);
    expect(store.state.project.technologySpecsSolarPV[0].complete).to.eql(false);
  });

  it('should update gamma and nu values in PVs when Reliability Service is deselected (d)', async () => {
    // starting with an errorList that has 2 items (gamma and nu), this action removes
    //   both of these items from errorList, so that this errorList is now []
    // starting with a non-null complete, complete should update to true
    const initialState: any = {
      technologySpecsSolarPV: [{
        gamma: 44,
        nu: 22,
        errorList: [
          'Timestep Percentage of PV Minimum Generation is reqd',
          'This Minimum Percentage of PV Generation is reqd',
        ],
      }],
    };
    const store: any = createStore(initialState);

    await store.dispatch(a.RESET_GAMMA_AND_NU, false);
    expect(store.state.project.technologySpecsSolarPV[0].gamma).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].nu).to.eql(null);
    expect(store.state.project.technologySpecsSolarPV[0].errorList.length).to.eql(0);
    expect(store.state.project.technologySpecsSolarPV[0].complete).to.eql(true);
  });
});
