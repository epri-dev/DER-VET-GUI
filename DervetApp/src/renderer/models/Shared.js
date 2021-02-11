/*
export const sharedDefaults = {
  macrsTerm: undefined,
  generationProfile: undefined,
  useExistingTimeSeriesData: true,
};
*/

export const sharedDefaults = {
  generationProfile: undefined,
  useExistingTimeSeriesData: true,
};

export const sharedValidation = {
  macrsTerm: {
    valType: Number,
    defaultVal: undefined,
    displayName: 'MACRS Term',
    allowedValues: [3, 5, 7, 10, 15, 20, 25, 27.5, 39],
    description: 'Which MACRS GDS category does solar PV fall into?',
  },
  generationProfileTimestep: {
    valType: String,
    defaultVal: '-',
    allowedValues: ['1', '5', '15', '30', '60'],
  },
  optionsYN: {
    valType: Boolean,
    allowedValues: [
      { text: 'Yes', value: true },
      { text: 'No', value: false },
    ],
  },
};
