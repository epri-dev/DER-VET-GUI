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
  macrsTerm: undefined,
  generationProfile: undefined,
  generationProfileTimestep: '60',
};

const validation = {
  loc: {
    type: String,
    allowedValues: ['AC', 'DC'],
  },
  // TODO move to shared file
  macrsTerm: {
    type: Number,
    allowedValues: [3, 5, 7, 10, 15, 20, 25, 27.5, 39],
  },
  // TODO move to shared file
  generationProfileTimestep: {
    type: String,
    allowedValues: ['1', '5', '15', '30', '60'],
  },
};

export default {
  defaults,
  validation,
};
