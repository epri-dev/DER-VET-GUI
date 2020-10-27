export const sharedDefaults = {
  macrsTerm: undefined,
  generationProfile: undefined,
  useExistingTimeSeriesData: true,
};

export const sharedValidation = {
  macrsTerm: {
    required: true,
    type: Number,
    allowedValues: [3, 5, 7, 10, 15, 20, 25, 27.5, 39],
    defaultVal: '',
  },
  generationProfileTimestep: {
    type: String,
    allowedValues: ['1', '5', '15', '30', '60'],
  },
  optionsYN: {
    type: Boolean,
    allowedValues: [
      { text: 'Yes', value: true },
      { text: 'No', value: false },
    ],
  },
};
