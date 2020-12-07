import ProjectFieldMetadata from '@/models/Project/Fields';
import { makeAllowedValuesWithNull } from '@/models/Project/constants';

const CONSTRUCTION_YEAR = 'constructionYear';
const DECOMISSIONING_COST = 'decomissioningCost';
const EXPECTED_LIFETIME = 'expectedLifetime';
const MACRS_TERM = 'macrsTerm';
const NAME = 'name';
const OPERATION_YEAR = 'operationYear';
const REPLACEABLE = 'replaceable';
const REPLACEMENT_CONSTRUCTION_TIME = 'replacementConstructionTime';
const SALVAGE_OPTION = 'salvageOption';
const SALVAGE_VALUE = 'salvageValue';
const TER = 'ter';

// Allowed values
const MACRS_TERM_ALLOWED_VALUES = makeAllowedValuesWithNull(['3', '5', '7', '10', '15', '20', '25', '27.5', '39']);

// Shared dynamic fields
export const SHARED_DYNAMIC_FIELDS = [
  CONSTRUCTION_YEAR,
  DECOMISSIONING_COST,
  EXPECTED_LIFETIME,
  MACRS_TERM,
  NAME,
  OPERATION_YEAR,
  REPLACEABLE,
  REPLACEMENT_CONSTRUCTION_TIME,
  SALVAGE_OPTION,
  SALVAGE_VALUE,
  TER,
];

// HardcodedMetadata
export const createSharedHardcodedMetadata = derType => ({
  [CONSTRUCTION_YEAR]: new ProjectFieldMetadata({
    defaultValue: null,
    displayName: 'Construction Year',
    isRequired: true,
    type: Date,
    unit: null,
    description: null,
    allowedValues: null,
  }),
  [DECOMISSIONING_COST]: new ProjectFieldMetadata({
    defaultValue: null,
    displayName: 'Decomissing Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$',
    description: 'The cost to decommission this DER when it has reached its expected lifetime end',
    allowedValues: null,
  }),
  [EXPECTED_LIFETIME]: new ProjectFieldMetadata({
    displayName: 'Expected Lifetime',
    isRequired: true,
    type: Number,
    description: 'The number of years the analysis will go for. The analysis will not consider equipment lifetime or anything else when determining the number of years to run for.',
    unit: 'years',
  }),
  [MACRS_TERM]: new ProjectFieldMetadata({
    defaultValue: null,
    displayName: 'MACRS Term',
    isRequired: true,
    type: Number,
    unit: 'years',
    description: `Which MACRS GDS category does ${derType} fall into?`,
    allowedValues: MACRS_TERM_ALLOWED_VALUES,
  }),
  [NAME]: new ProjectFieldMetadata({
    defaultValue: null,
    displayName: 'Name',
    isRequired: true,
    type: String,
    unit: null,
    description: null,
    allowedValues: null,
  }),
  [OPERATION_YEAR]: new ProjectFieldMetadata({
    defaultValue: null,
    displayName: 'Operation Year',
    isRequired: true,
    type: Date,
    unit: null,
    description: null,
    allowedValues: null,
  }),
});
