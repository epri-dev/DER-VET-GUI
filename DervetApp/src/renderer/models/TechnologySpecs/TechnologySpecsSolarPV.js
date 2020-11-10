import { sharedDefaults, sharedValidation } from '@/models/Shared.js';

const defaults = {
  active: false,
  constructionDate: '',
  cost: 0,
  generationProfile: null,
  id: '',
  inverterMax: 1000000000,
  loc: '',
  macrsTerm: sharedDefaults.macrsTerm,
  name: '',
  operationDate: '',
  ratedCapacity: 0,
  shouldSize: true,
  tag: 'PV',
  technologyType: 'Intermittent Resource',
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
