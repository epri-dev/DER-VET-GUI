const defaults = {
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
  macrsTerm: undefined,
  shouldSize: true,
  numGenerators: 0,
  minGenerators: 0,
  maxGenerators: 1,
};

const validation = {
  macrsTerm: {
    type: Number,
    allowedValues: [3, 5, 7, 10, 15, 20, 25, 27.5, 39],
  },
};

export default {
  defaults,
  validation,
};
