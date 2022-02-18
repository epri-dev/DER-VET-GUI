import _ from 'lodash';

import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { objectToCsv } from '@/util/file';
import { validateCsvHeaders, validateCsvRowLength } from '@/util/validation';

export const INCENTIVES_HEADERS = ['Year', 'Tax Credit (nominal $)', 'Other Incentive (nominal $)'];

interface ExternalIncentive {
  year: number,
  taxCredit: number,
  otherIncentive: number,
}

export default class ExternalIncentivesMetadata {
  year: ValueFieldMetadata = {
    displayName: 'Year',
    isRequired: true,
    // TODO this will eventually come from root of project directory
    // minValueIf: { field: 'year', condition: (x: any) => (nonEmpty(x) ? x + 1 : 0) },
    minValue: 0,
    type: 'int',
    description: 'Please use a valid year for the project. Year one of the project is the year after the Project Start Year.',
  };
  taxCredit: ValueFieldMetadata = {
    defaultValue: 0,
    displayName: 'Tax Credit',
    isRequired: true,
    minValue: 0,
    type: 'float',
    unit: 'nominal $',
  };
  otherIncentive: ValueFieldMetadata = {
    defaultValue: 0,
    displayName: 'Other Incentive',
    isRequired: true,
    minValue: 0,
    type: 'float',
    unit: 'nominal $',
  };
}

export const validateExternalIncentivesCsv = (rows: any[][]): string => {
  const headerError = validateCsvHeaders(rows, INCENTIVES_HEADERS);
  const rowLengthError = validateCsvRowLength(rows, 3);
  return headerError || rowLengthError;
};

export const csvToExternalIncentives = (rows: any[][]): ExternalIncentive[] => {
  rows = rows.slice(1); // remove header
  return _.map(rows, (row: any[]): ExternalIncentive => ({
    year: row[0],
    taxCredit: row[1],
    otherIncentive: row[2],
  }));
};

export const externalIncentivesToCsv = (incentives: any) => {
  const fields = ['year', 'taxCredit', 'otherIncentive'];
  return objectToCsv(incentives, fields, INCENTIVES_HEADERS);
};
