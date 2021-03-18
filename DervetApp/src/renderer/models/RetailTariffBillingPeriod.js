import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import ProjectFieldMetadata from '@/models/Project/FieldMetadata';
import { objectToCsv, filterRowsByColumnCount } from '@/util/file';

const WEEKDAY_ALLOWED_VALUES = [
  {
    value: 0,
    label: 'Weekends',
  },
  {
    value: 1,
    label: 'Weekdays',
  },
  {
    value: 2,
    label: 'Both weekends and weekdays',
  },
];

const CHARGE_ALLOWED_VALUES = [
  {
    value: 'Energy',
    label: 'Energy Price',
    unit: '$/kWh',
  },
  {
    value: 'Demand',
    label: 'Demand Rate',
    unit: '$/kW',
  },
];

export const RETAIL_TARIFF_HEADERS = [
  'Billing Period',
  'Start Month',
  'End Month',
  'Start Time',
  'End Time',
  'Excluding Start Time',
  'Excluding End Time',
  'Weekday?',
  'Value',
  'Charge',
  'Name',
];

const DYNAMIC_FIELDS = [
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

export default class RetailTariffBillingPeriodMetadata {
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
    this.complete = arg.complete;
  }

  operateOnDynamicFields(callback) {
    return _.mapValues(_.pick(this, DYNAMIC_FIELDS), callback);
  }

  getDefaultValues() {
    return {
      id: uuidv4(),
      complete: null,
      ...this.operateOnDynamicFields(f => f.defaultValue),
    };
  }

  toValidationSchema() {
    return this.operateOnDynamicFields(f => f.toValidationSchema());
  }

  static getHardcodedMetadata() {
    return new RetailTariffBillingPeriodMetadata({
      startMonth: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Start Month',
        isRequired: true,
        minValue: 1,
        maxValue: 12,
        type: 'int',
        unit: '',
        description: '',
        allowedValues: null,
      }),
      endMonth: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'End Month',
        isRequired: true,
        minValue: 1,
        maxValue: 12,
        type: 'int',
        unit: '',
        description: '',
        allowedValues: null,
      }),
      startTime: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Start Hour',
        isRequired: true,
        minValue: 1,
        maxValue: 24,
        type: 'int',
        unit: '',
        description: '',
        allowedValues: null,
      }),
      endTime: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'End Hour',
        isRequired: true,
        minValue: 1,
        maxValue: 24,
        type: 'int',
        unit: '',
        description: '',
        allowedValues: null,
      }),
      excludingStartTime: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Excluding Start Hour',
        isRequired: true,
        minValue: 1,
        maxValue: 24,
        type: 'int',
        unit: '',
        description: 'Indicate an optional beginning hour to exclude.',
        allowedValues: null,
      }),
      excludingEndTime: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Excluding End Hour',
        isRequired: true,
        minValue: 1,
        maxValue: 24,
        type: 'int',
        unit: '',
        description: 'Indicate an optional ending hour to exclude.',
        allowedValues: null,
      }),
      weekday: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Weekday?',
        isRequired: true,
        type: String,
        unit: '',
        description: '',
        allowedValues: WEEKDAY_ALLOWED_VALUES,
      }),
      value: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Value',
        isRequired: true,
        minValue: 0,
        type: 'float',
        unit: '',
        description: '',
        allowedValues: null,
        initDisplayName: 'Value',
        initUnit: '',
      }),
      chargeType: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Charge Type',
        isRequired: true,
        type: String,
        unit: '',
        description: '',
        allowedValues: CHARGE_ALLOWED_VALUES,
      }),
      name: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Name (optional)',
        isRequired: false,
        type: String,
        unit: '',
        description: '',
        allowedValues: null,
      }),
    });
  }
}

export const parsedCsvToBillingPeriods = (csv) => {
  // returns data object, and an array of import notes

  const fileImportNotes = [];
  // TODO validate headers to ensure order of fields is correct
  //   and billing period is complete

  // remove the first row
  // TODO what if there is not a header row present?
  fileImportNotes.push('The first line was assumed a header, and skipped');
  let csvValues = csv.slice(1);

  // only keep rows with validRowLength elements
  const validRowLength = 11;
  const filterRowsObject = filterRowsByColumnCount(csvValues, validRowLength);
  csvValues = filterRowsObject.rows;
  if (filterRowsObject.importNotes !== null) {
    fileImportNotes.push(filterRowsObject.importNotes);
  }

  csvValues = csvValues.map(row => (
    new RetailTariffBillingPeriodMetadata({
      // TODO use a function here to validate each row, and set boolean complete
      complete: null,
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
  return {
    csvValues,
    fileImportNotes,
  };
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
  return objectToCsv(billingPeriods, fields, RETAIL_TARIFF_HEADERS);
};
