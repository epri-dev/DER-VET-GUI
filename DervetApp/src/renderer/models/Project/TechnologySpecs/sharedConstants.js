import ProjectFieldMetadata from '@/models/Project/FieldMetadata';
import {
  optionsYN,
  makeAllowedValuesWithNull,
} from '@/models/Project/constants';

const CONSTRUCTION_YEAR = 'constructionYear';
const DECOMISSIONING_COST = 'decomissioningCost';
const EXPECTED_LIFETIME = 'expectedLifetime';
export const MACRS_TERM = 'macrsTerm';
const NAME = 'name';
const OPERATION_YEAR = 'operationYear';
const REPLACEABLE = 'isReplaceable';
const REPLACEMENT_CONSTRUCTION_TIME = 'replacementConstructionTime';
const SALVAGE_OPTION = 'salvageValueOption';
const SALVAGE_VALUE = 'salvageValue';
const TER = 'ter';

// Allowed values
const MACRS_TERM_ALLOWED_VALUES = makeAllowedValuesWithNull(['3', '5', '7', '10', '15', '20', '25', '27.5', '39']);
const SALVAGE_OPTION_ALLOWED_VALUES = makeAllowedValuesWithNull(['Sunk Cost', 'Linear Salvage Value', 'User defined']);

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
    description: 'In what year will construction start?',
    displayName: 'Construction Year',
    isRequired: true,
    type: Number,
  }),
  [DECOMISSIONING_COST]: new ProjectFieldMetadata({
    displayName: 'Decomissioning Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$',
    description: `The cost to decommission ${derType} when it has reached its expected lifetime end`,
  }),
  [EXPECTED_LIFETIME]: new ProjectFieldMetadata({
    displayName: 'Expected Lifetime',
    isRequired: true,
    minValue: 1,
    type: Number,
    description: `The number of years the ${derType} will operate before new equipment is required to continue operation.`,
    unit: 'years',
  }),
  [MACRS_TERM]: new ProjectFieldMetadata({
    displayName: 'MACRS Term',
    isRequired: true,
    type: Number,
    unit: 'years',
    description: `Which MACRS GDS category does ${derType} fall into?`,
    allowedValues: MACRS_TERM_ALLOWED_VALUES,
  }),
  [NAME]: new ProjectFieldMetadata({
    displayName: 'Name',
    isRequired: true,
    type: String,
  }),
  [OPERATION_YEAR]: new ProjectFieldMetadata({
    description: 'In what year will operation start (COD)?',
    displayName: 'Operation Year',
    isRequired: true,
    type: Number,
  }),
  [REPLACEABLE]: new ProjectFieldMetadata({
    displayName: 'Replaceable?',
    isRequired: true,
    type: Boolean,
    description: `Will the ${derType} be replaced at its end of lifetime or not?`,
    allowedValues: optionsYN,
  }),
  [REPLACEMENT_CONSTRUCTION_TIME]: new ProjectFieldMetadata({
    displayName: 'Replacement Construction Time',
    isRequired: false, // based on REPLACEABLE
    minValue: 1,
    type: Number,
    description: 'The time it takes to finish equipment replacement construction',
    unit: 'years',
  }),
  [SALVAGE_OPTION]: new ProjectFieldMetadata({
    defaultValue: null,
    displayName: 'Salvage Value',
    isRequired: true,
    type: String,
    unit: null,
    description: 'Applies a financial benefit in the last year of the analysis window if the resource is not beyond its end of life. <b>Sunk Cost</b> means that there is no end of analysis value (salvage value = 0), <b>Linear Salvage Value</b> which will calculate salvage value by multiplying the technology\'s capital cost by (remaining life/total life), or <b>User Defined</b> to specify the exact salvage value of the technology.',
    allowedValues: SALVAGE_OPTION_ALLOWED_VALUES,
  }),
  [SALVAGE_VALUE]: new ProjectFieldMetadata({
    displayName: 'User-defined Salvage Value',
    isRequired: false, // based on SALVAGE_OPTION
    minValue: 0,
    type: Number,
    unit: '$',
    description: `The exact present day value of salvaging the ${derType} equipment at the end of the project.`,
  }),
  [TER]: new ProjectFieldMetadata({
    displayName: 'Technology Escalation Rate',
    isRequired: true,
    minValue: -100,
    maxValue: 100,
    type: Number,
    unit: '%',
    description: `The rate at which the ${derType}'s cost increases or decreases in cost each year. A negative value indicates the technology is decreasing in cost over time. A value equal to the inflation rate indicates that the real cost of the technology is constant.`,
  }),
});