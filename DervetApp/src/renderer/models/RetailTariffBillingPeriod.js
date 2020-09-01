import { classObjectsToCsv } from '@/util/helpers';

export const RETAIL_TARIFF_HEADERS = [
  'ID',
  'Start Month',
  'End Month',
  'Start Time',
  'End Time',
  'Excluding Start Time',
  'Excluding End Time',
  'Weekday',
  'Value',
  'Charge',
  'Name',
];

export class RetailTariffBillingPeriod {
  constructor(arg) {
    this.id = arg.id;
    this.startMonth = arg.startMonth;
    this.endMonth = arg.endMonth;
    this.startTime = arg.startTime;
    this.endTime = arg.endTime;
    this.excludingStartTime = arg.excludingStartTime;
    this.excludingEndTime = arg.excludingEndTime;
    this.weekday = arg.weekday;
    this.value = arg.value;
    this.chargeType = arg.chargeType;
    this.name = arg.name;
  }

  static getDefaults() {
    return new RetailTariffBillingPeriod({
      id: null,
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
    });
  }
}

export const parsedCsvToBillingPeriods = (csv) => {
  // TODO validate headers to ensure order of fields is correct
  let csvValues = csv.slice(1);
  csvValues = csvValues.filter(row => row.length === 11);

  return csvValues.map(row => (
    new RetailTariffBillingPeriod({
      id: row[0],
      startMonth: row[1],
      endMonth: row[2],
      startTime: row[3],
      endTime: row[4],
      excludingStartTime: row[5],
      excludingEndTime: row[6],
      weekday: row[7],
      value: row[8],
      chargeType: row[9],
      name: row[10],
    })
  ));
};

export const billingPeriodsToCsv = (billingPeriods) => {
  const fields = [
    'id',
    'startMonth',
    'endMonth',
    'startTime',
    'endTime',
    'excludingStartTime',
    'excludingEndTime',
    'weekday',
    'value',
    'chargeType',
    'name',
  ];
  return classObjectsToCsv(billingPeriods, fields, RETAIL_TARIFF_HEADERS);
};

export const validation = {
  chargeType: {
    type: String,
    allowedValues: [{
      value: 'Energy',
      unit: '$/kWh',
      valueText: 'Energy Price',
    },
    {
      value: 'Demand',
      unit: '$/kW',
      valueText: 'Demand Rate',
    }],
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
