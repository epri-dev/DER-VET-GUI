import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import { makeDatetimeIndex } from '@/service/ProjectDto';
import { getDefaultValues } from '@/service/ProjectPage';
import ValidationService from '@/service/Validation/ValidationService';
import { validateCollection, formatForPageStatus } from '@/service/Validation/ValueValidationService';
import resetInactiveValues from '@/service/ProjectReset';
import ProjectMetadata from '@/models/Project/Metadata/ProjectMetadata';
import { CollectionType, Technology } from '@/models/Project/CollectionType';
import SolarPVMetadata, { LOC, LocType } from '@/models/Project/Metadata/TechnologySpecs/SolarPV';
import * as m from '@/store/mutationTypes';
import * as a from '@/store/actionTypes';

const techSolarPVMetadataDefaults = getDefaultValues(new SolarPVMetadata());
const projectMetadata = new ProjectMetadata();

const defaultCollections = _.reduce(CollectionType, (r, coll) => { r[coll] = []; return r; }, {});
delete defaultCollections.Project;

export const getDefaultState = () => ({
  ...getDefaultValues(projectMetadata),
  ...defaultCollections,
});

const state = getDefaultState();

const getters = {
  includeSiteLoad(state) {
    return () => (
      state.objectivesRetailDemandChargeReduction || state.objectivesRetailEnergyChargeReduction
    );
  },
  getCollectionClone(state) {
    return collectionName => _.cloneDeep(state[collectionName]);
  },
  getIndexOfCollectionItemById(state) {
    return (collectionName, id) => state[collectionName].findIndex(x => x.id === id);
  },
  getCollectionItemById(state) {
    return (collectionName, id) => state[collectionName].find(x => x.id === id);
  },
  checkConditionOnCollection(state) {
    return (collectionType, condition) => !_.isEmpty(_.filter(state[collectionType], condition));
  },
  activeBatteryExists(state, getters) {
    return getters.checkConditionOnCollection(CollectionType.Battery, batt => batt.active);
  },
  isFuelPriceRequired(state, getters) {
    return (fuelType) => {
      const condition = tech => (tech.values.fuelType === fuelType);
      return (getters.checkConditionOnCollection(CollectionType.DieselGen, condition)
        || getters.checkConditionOnCollection(CollectionType.ICE, condition));
    };
  },
  getTimeseriesXAxis(state) {
    return makeDatetimeIndex(state.dataYear, state.timestep, false);
  },
};

const mutations = {
  [m.SET_PROJECT](state, project) {
    Object.assign(state, project);
  },
  [m.SET_VALUE](state, payload) {
    state[payload.key] = payload.value;
  },
  [m.ADD_COLLECTION_ITEM](state, payload) {
    const { collectionType, id, values } = payload;
    state[collectionType].push({ values, id, active: true });
  },
  [m.REMOVE_COLLECTION_ITEM](state, payload) {
    const { collectionType, id } = payload;
    const indexMatchingId = getters.getIndexOfCollectionItemById(state)(collectionType, id);
    state[collectionType].splice(indexMatchingId, 1);
  },
  [m.REPLACE_COLLECTION_ITEM](state, payload) {
    const { collectionType, id, values } = payload;
    const tmpCollection = getters.getCollectionClone(state)(collectionType);
    const indexMatchingId = getters.getIndexOfCollectionItemById(state)(collectionType, id);
    tmpCollection[indexMatchingId].values = values;
    state[collectionType] = tmpCollection;
  },
  [m.ADD_MANY_COLLECTION_ITEMS](state, payload) {
    const { collectionType, values } = payload;
    state[collectionType].push(...values);
  },
  [m.REMOVE_ALL_COLLECTION_ITEMS](state, collectionType) {
    state[collectionType] = [];
  },
  [m.ACTIVATE_TECH](state, payload) {
    const { collectionType, id } = payload;
    const indexMatchingId = getters.getIndexOfCollectionItemById(state)(collectionType, id);
    state[collectionType][indexMatchingId].active = true;
  },
  [m.DEACTIVATE_TECH](state, payload) {
    const { collectionType, id } = payload;
    const indexMatchingId = getters.getIndexOfCollectionItemById(state)(collectionType, id);
    state[collectionType][indexMatchingId].active = false;
  },
  [m.SET_ALL_VALUES_IN_TECH](state, { techType, key, value }) {
    _.each(state[techType], tech => { tech.values[key] = value; });
  },
  // TODO change to SET_UNIQUE_IDS_IN_COLLECTION?
  [m.SET_UNIQUE_IDS_IN_TECH](state) {
    _.each(Technology, techType => _.each(state[techType], tech => { tech.id = uuidv4(); }));
  },
};

const actions = {
  [a.RESET_PROJECT]({ commit }) {
    commit(m.SET_PROJECT, getDefaultState());
  },
  [a.LOAD_NEW_PROJECT]({ commit, state }, project) {
    return new Promise((resolve) => {
      commit(m.SET_PROJECT, _.merge(_.cloneDeep(getDefaultState()), _.cloneDeep(project)));
      commit(m.SET_UNIQUE_IDS_IN_TECH);
      resolve(state);
    });
  },
  [a.RESET_VALUES_TO_DEFAULT]({ commit, state }) {
    const stateReset = resetInactiveValues(state);
    commit(m.SET_PROJECT, stateReset);
  },
  [a.SET_VALUES]({ commit }, valuePayloads) {
    _.each(valuePayloads, payload => commit(m.SET_VALUE, payload));
  },
  [a.ADD_COLLECTION_ITEM]({ commit, getters, dispatch }, payload) {
    return new Promise((resolve) => {
      const { collectionType } = payload;
      if (collectionType === CollectionType.Battery) {
        if (!getters.activeBatteryExists) {
          commit(m.SET_ALL_VALUES_IN_TECH, {
            techType: CollectionType.SolarPV,
            key: LOC,
            value: null,
          });
        }
      }
      const id = uuidv4();
      payload.id = id;
      commit(m.ADD_COLLECTION_ITEM, payload);
      dispatch(`Application/${a.SET_DEFAULT_PAGE_STATUS}`, { page: collectionType, id });
      resolve(id);
    });
  },
  // Only used for importing tariffs/external incentives and OpenEI
  [a.ADD_MANY_COLLECTION_ITEMS]({ commit, dispatch }, payload) {
    return new Promise((resolve) => {
      const { collectionType, valuesList } = payload;
      const valuesListWithIds = _.map(valuesList, values => ({ values, id: uuidv4() }));
      commit(m.ADD_MANY_COLLECTION_ITEMS, { collectionType, values: valuesListWithIds });

      const errors = validateCollection(collectionType, valuesListWithIds);
      const pageStatusSet = formatForPageStatus(errors);
      const pageStatusPayload = { collectionType, pageStatusSet };
      dispatch(`Application/${a.SET_MANY_COLLECTION_PAGE_STATUS}`, pageStatusPayload);
      resolve();
    });
  },
  [a.REPLACE_COLLECTION_ITEM]({ commit }, payload) {
    commit(m.REPLACE_COLLECTION_ITEM, payload);
  },
  [a.REMOVE_COLLECTION_ITEM]({ commit, dispatch, getters }, payload) {
    const { collectionType, id } = payload;
    commit(m.REMOVE_COLLECTION_ITEM, payload);
    if (collectionType === CollectionType.Battery) {
      if (!getters.activeBatteryExists) {
        commit(m.SET_ALL_VALUES_IN_TECH, {
          techType: CollectionType.SolarPV,
          key: LOC,
          value: LocType.AC,
        });
      }
    }
    dispatch(`Application/${a.REMOVE_COLLECTION_PAGE_STATUS}`, { page: collectionType, id });
  },
  [a.REMOVE_ALL_COLLECTION_ITEMS]({ commit, dispatch }, collectionType) {
    commit(m.REMOVE_ALL_COLLECTION_ITEMS, collectionType);
    dispatch(`Application/${a.REMOVE_ALL_COLLECTION_PAGE_STATUS}`, collectionType);
  },
  [a.ACTIVATE_TECH]({ commit, getters }, payload) {
    const { collectionType } = payload;
    if (collectionType === CollectionType.Battery) {
      if (!getters.activeBatteryExists) {
        commit(m.SET_ALL_VALUES_IN_TECH, {
          techType: CollectionType.SolarPV,
          key: LOC,
          value: null,
        });
      }
    }
    commit(m.ACTIVATE_TECH, payload);
  },
  [a.DEACTIVATE_TECH]({ commit, getters }, payload) {
    const { collectionType } = payload;
    commit(m.DEACTIVATE_TECH, payload);
    if (collectionType === CollectionType.Battery) {
      if (!getters.activeBatteryExists) {
        commit(m.SET_ALL_VALUES_IN_TECH, {
          techType: CollectionType.SolarPV,
          key: LOC,
          value: LocType.AC,
        });
      }
    }
  },
  [a.RESET_GAMMA_AND_NU]({ commit }) {
    const gammaPayload = {
      techType: CollectionType.SolarPV,
      key: 'gamma', // TODO use constant
      value: techSolarPVMetadataDefaults.gamma,
    };
    const nuPayload = {
      techType: CollectionType.SolarPV,
      key: 'nu', // TODO use constant
      value: techSolarPVMetadataDefaults.nu,
    };
    commit(m.SET_ALL_VALUES_IN_TECH, gammaPayload);
    commit(m.SET_ALL_VALUES_IN_TECH, nuPayload);
  },
  [a.VALIDATE_PROJECT_AND_SET_ERRORS]({ state, dispatch }) {
    const errors = ValidationService.validate(state);
    dispatch(`Application/${a.MERGE_PAGE_STATUS}`, errors);
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
