import { sharedDefaults, sharedValidation } from '@/models/Shared.js';
import { v4 as uuidv4 } from 'uuid';

const defaults = {
  active: false,
  constructionDate: '',
  cost: 0,
  generationProfile: null,
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

const makeEmptyPV = () => ({
  id: uuidv4(),
  ...defaults,
});

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
  makeEmptyPV,

};
