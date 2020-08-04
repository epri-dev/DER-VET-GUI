const getDefaultState = () => ({
  id: null,
  name: null,
});

const state = getDefaultState();

const mutations = {
  SET_ID(state, newId) {
    state.id = newId;
  },
  SET_NAME(state, newName) {
    state.name = newName;
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
  resetProjectToDefault({ commit }) {
    commit('RESET_PROJECT_TO_DEFAULT');
  },
};

export default {
  state,
  mutations,
  actions,
};
