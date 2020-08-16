export const sharedDefaults = {
  macrsTerm: undefined,
  generationProfile: undefined,
  generationProfileTimestep: '60',
};

export const sharedValidation = {
  macrsTerm: {
    type: Number,
    allowedValues: [3, 5, 7, 10, 15, 20, 25, 27.5, 39],
  },
  generationProfileTimestep: {
    type: String,
    allowedValues: ['1', '5', '15', '30', '60'],
  },
};
