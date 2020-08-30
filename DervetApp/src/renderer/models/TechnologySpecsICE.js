import { sharedDefaults, sharedValidation } from './Shared.js';

const defaults = {
  tag: 'ICE',
  technologyType: 'Generator',
  id: '',
  name: '',
  ratedCapacity: 0,
  minimumPower: 0,
  startupTime: 0,
  efficiency: 0,
  fuelCost: 0,
  capitalCost: 0,
  variableOMCost: 0,
  fixedOMCostIncludingExercise: 0,
  constructionDate: '',
  operationDate: '',
  macrsTerm: sharedDefaults.macrsTerm,
  shouldSize: true,
  numGenerators: 0,
  minGenerators: 0,
  maxGenerators: 1,
};

const validation = {
  macrsTerm: sharedValidation.macrsTerm,
};

export default {
  defaults,
  validation,
};
