import { sharedDefaults, sharedValidation } from './Shared.js';

const defaults = {
  active: false,
  tag: 'PV',
  technologyType: 'Intermittent Resource',
  id: '',
  name: '',
  cost: 0,
  shouldSize: true,
  ratedCapacity: 0,
  loc: '',
  inverterMax: 1000000000,
  constructionDate: '',
  operationDate: '',
  macrsTerm: sharedDefaults.macrsTerm,
  generationProfile: null,
};

const validation = {
  loc: {
    type: String,
    allowedValues: ['AC', 'DC'],
  },
  macrsTerm: sharedValidation.macrsTerm,
};

export default {
  defaults,
  validation,
};
