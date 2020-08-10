const getDefaultState = () => ({
  id: null,
  name: null,
  type: null,
  resultsData: null,
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
  startNewProject({ commit }, newId, newName, type) {
    commit('SET_ID', newId);
    commit('SET_NAME', newName);
    commit('SET_TYPE', type);
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
