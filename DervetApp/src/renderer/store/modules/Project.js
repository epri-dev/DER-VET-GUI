import { cloneDeep } from 'lodash';


const getDefaultState = () => ({
  id: null,
  name: '',
  type: null,
  resultsData: null,
  technologySpecsSolarPV: [],
  technologySpecsICE: [],
  discountRate: 0,
  inflationRate: 0,
  federalTaxRate: 0,
  stateTaxRate: 0,
  propertyTaxRate: 0,
});

const state = getDefaultState();

const mutations = {
  SET_ID(state, newId) {
    state.id = newId;
  },
  SET_NAME(state, newName) {
    state.name = newName;
  },
  SET_TYPE(state, type) {
    state.type = type;
  },
  SET_DISCOUNT_RATE(state, newDiscountRate) {
    state.discountRate = newDiscountRate;
  },
  SET_INFLATION_RATE(state, newInflationRate) {
    state.inflationRate = newInflationRate;
  },
  SET_FEDERAL_TAX_RATE(state, newFederalTaxRate) {
    state.federalTaxRate = newFederalTaxRate;
  },
  SET_STATE_TAX_RATE(state, newStateTaxRate) {
    state.stateTaxRate = newStateTaxRate;
  },
  SET_PROPERTY_TAX_RATE(state, newPropertyTaxRate) {
    state.propertyTaxRate = newPropertyTaxRate;
  },
  ADD_TECHNOLOGY_SPECS_SOLAR_PV(state, newSolar) {
    state.technologySpecsSolarPV.push(newSolar);
  },
  ADD_TECHNOLOGY_SPECS_ICE(state, newICE) {
    state.technologySpecsICE.push(newICE);
  },
  REPLACE_TECHNOLOGY_SPECS_SOLAR_PV(state, payload) {
    const tmpSolarPVSpecs = cloneDeep(state.technologySpecsSolarPV);
    const indexMatchingId = tmpSolarPVSpecs.findIndex(x => x.id === payload.solarId);
    tmpSolarPVSpecs[indexMatchingId] = payload.newSolar;
    state.technologySpecsSolarPV = tmpSolarPVSpecs;
  },
  REPLACE_TECHNOLOGY_SPECS_ICE(state, payload) {
    const tmpICESpecs = cloneDeep(state.technologySpecsICE);
    const indexMatchingId = tmpICESpecs.findIndex(x => x.id === payload.iceId);
    tmpICESpecs[indexMatchingId] = payload.newICE;
    state.technologySpecsICE = tmpICESpecs;
  },
  RESET_PROJECT_TO_DEFAULT(state) {
    Object.assign(state, getDefaultState());
  },
};

const actions = {
  setId({ commit }, newId) {
    commit('SET_ID', newId);
  },
  setName({ commit }, newName) {
    commit('SET_NAME', newName);
  },
  setType({ commit }, type) {
    commit('SET_TYPE', type);
  },
  setDiscountRate({ commit }, newDiscountRate) {
    commit('SET_DISCOUNT_RATE', newDiscountRate);
  },
  setInflationRate({ commit }, newInflationRate) {
    commit('SET_INFLATION_RATE', newInflationRate);
  },
  setFederalTaxRate({ commit }, newFederalTaxRate) {
    commit('SET_FEDERAL_TAX_RATE', newFederalTaxRate);
  },
  setStateTaxRate({ commit }, newStateTaxRate) {
    commit('SET_STATE_TAX_RATE', newStateTaxRate);
  },
  setPropertyTaxRate({ commit }, newPropertyTaxRate) {
    commit('SET_PROPERTY_TAX_RATE', newPropertyTaxRate);
  },
  startNewProject({ commit }, newId, newName, type) {
    commit('SET_ID', newId);
    commit('SET_NAME', newName);
    commit('SET_TYPE', type);
  },
  addTechnologySpecsSolarPV({ commit }, newSolar) {
    commit('ADD_TECHNOLOGY_SPECS_SOLAR_PV', newSolar);
  },
  addTechnologySpecsICE({ commit }, newICE) {
    commit('ADD_TECHNOLOGY_SPECS_ICE', newICE);
  },
  replaceTechnologySpecsSolarPV({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_SOLAR_PV', payload);
  },
  replaceTechnologySpecsICE({ commit }, payload) {
    commit('REPLACE_TECHNOLOGY_SPECS_ICE', payload);
  },
  resetProjectToDefault({ commit }) {
    commit('RESET_PROJECT_TO_DEFAULT');
  },
};

export default {
  state,
  mutations,
  actions,
};
