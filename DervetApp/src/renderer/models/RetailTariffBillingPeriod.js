const defaults = {
  retailTariffBillingPeriodId: null,
  startMonth: 0,
  endMonth: 0,
  startTime: 0,
  endTime: 0,
  excludingStartTime: null,
  excludingEndTime: null,
  weekday: null,
  value: 0,
  chargeType: '',
  name: '',
};

const validation = {
  chargeType: {
    type: String,
    allowedValues: ['Energy', 'Demand'],
  },
  weekday: {
    allowedValues: [
      {
        value: 0,
        description: 'Weekends',
      },
      {
        value: 1,
        description: 'Weekdays',
      },
      {
        value: 2,
        description: 'Both weekends and weekdays',
      },
    ],
  },
};

export default {
  defaults,
  validation,
};
