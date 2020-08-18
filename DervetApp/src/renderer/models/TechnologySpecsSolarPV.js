import { sharedDefaults, sharedValidation } from './Shared.js';

const defaults = {
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
  generationProfile: sharedDefaults.generationProfile,
  generationProfileTimestep: sharedDefaults.generationProfileTimestep,
};

const validation = {
  loc: {
    type: String,
    allowedValues: ['AC', 'DC'],
  },
  macrsTerm: sharedValidation.macrsTerm,
  generationProfileTimestep: sharedValidation.generationProfileTimestep,
};

export default {
  defaults,
  validation,
};
