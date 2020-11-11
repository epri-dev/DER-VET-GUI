import { sharedDefaults, sharedValidation } from '@/models/Shared.js';
import { v4 as uuidv4 } from 'uuid';

export const defaults = {
  active: false,
  tag: 'DieselGen',
  technologyType: 'Generator',
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

export const validation = {
  macrsTerm: sharedValidation.macrsTerm,
};

export const makeEmptyDieselGen = () => ({
  id: uuidv4(),
  ...defaults,
});

