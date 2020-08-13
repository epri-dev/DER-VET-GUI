const defaults = {
  name: '',
  cost: 0,
  shouldSize: true,
  ratedCapacity: 0,
  loc: '',
  inverterMax: 1000000000,
  constructionDate: '',
  operationDate: '',
  macrsTerm: undefined,
};

const validation = {
  loc: {
    type: String,
    allowedValues: ['AC', 'DC'],
  },
  macrsTerm: {
    type: Number,
    allowedValues: [3, 5, 7, 10, 15, 20, 25, 27.5, 39],
  },
};

export default {
  defaults,
  validation,
};
