import * as a from '@/store/actionTypes';

export const actions = {
  resetAll({ dispatch }) {
    return dispatch(`Application/${a.KILL_PYTHON}`)
      .then(dispatch(a.RESET_PROJECT))
      .then(dispatch(`Results/${a.RESET}`))
      .then(dispatch(`Application/${a.RESET}`))
      .then(dispatch(a.RESET_ZIP_CODE));
  },
};

export const mutations = {};
