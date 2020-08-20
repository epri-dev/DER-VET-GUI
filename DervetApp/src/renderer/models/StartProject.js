const validation = {
  analysisHorizonMode: {
    type: String,
    allowedValues: [{ value: '1', description: 'User-defined analysis horizon' }, { value: '2', description: 'Auto-calculate analysis horizon by shortest DER lifetime' }, { value: '3', description: 'Auto-calculate analysis horizon by longest DER lifetime' }, { value: '4', description: 'Use carrying cost' }],
  },
  gridLocation: {
    type: String,
    allowedValues: ['Generation', 'Transmission', 'Distribution', 'Customer'],
  },
  ownership: {
    type: String,
    allowedValues: ['Customer', 'Utility', '3rd Party'],
  },
  optimizationHorizonOptions: {
    allowedValues: ['Year', 'Month', 'Hours'],
  },
};

export default {
  validation,
};
