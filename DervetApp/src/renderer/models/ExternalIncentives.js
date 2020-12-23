import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { objectToCsv } from '@/util/file';

import ProjectFieldMetadata from '@/models/Project/Fields';

export const INCENTIVES_HEADERS = ['Year', 'Tax Credit (nominal $)', 'Other Incentive (nominal $)'];

const DYNAMIC_FIELDS = [
  'year',
  'taxCredit',
  'otherIncentive',
];

export default class ExternalIncentivesMetadata {
  constructor(arg) {
    this.id = arg.id;
    this.year = arg.year;
    this.taxCredit = arg.taxCredit;
    this.otherIncentive = arg.otherIncentive;
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
    return new ExternalIncentivesMetadata({
      year: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Year',
        isRequired: true,
        minValue: 0,
        type: 'int',
        unit: '',
        description: 'Please use a valid year for the project. Year one of the project is the year after the Project Start Year.',
        allowedValues: null,
      }),
      taxCredit: new ProjectFieldMetadata({
        defaultValue: 0,
        displayName: 'Tax Credit',
        isRequired: true,
        minValue: 0,
        type: 'float',
        unit: 'nominal $',
        description: '',
        allowedValues: null,
      }),
      otherIncentive: new ProjectFieldMetadata({
        defaultValue: 0,
        displayName: 'Other Incentive',
        isRequired: true,
        minValue: 0,
        type: 'float',
        unit: 'nominal $',
        description: '',
        allowedValues: null,
      }),
    });
  }
}

export const parsedCsvToExternalIncentives = (csv) => {
  // TODO validate headers to ensure order of fields is correct
  // TODO make reusable function to be shared between billing pds and external incentives
  let csvValues = csv.slice(1);
  csvValues = csvValues.filter(row => row.length === 3);

  return csvValues.map(row => (
    new ExternalIncentivesMetadata({
      complete: true,
      id: uuidv4(),
      year: row[0],
      taxCredit: row[1],
      otherIncentive: row[2],
    })
  ));
};

export const externalIncentivesToCsv = (incentives) => {
  const fields = ['year', 'taxCredit', 'otherIncentive'];
  return objectToCsv(incentives, fields, INCENTIVES_HEADERS);
};
