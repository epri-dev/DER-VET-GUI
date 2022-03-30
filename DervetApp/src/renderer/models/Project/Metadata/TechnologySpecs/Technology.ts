import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { YES_NO_OPTIONS } from '@/models/Project/Metadata/AllowedValues/constants';
import { arrayToAllowedValuesWithNull } from '@/models/Project/Metadata/AllowedValues/generators';

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

const MACRS_TERMS = arrayToAllowedValuesWithNull([3, 5, 7, 10, 15, 20]);
const SALVAGE_OPTIONS = arrayToAllowedValuesWithNull(['Sunk Cost', 'Linear Salvage Value', 'User defined']);

export class TechnologyMetadata {
  [CONSTRUCTION_YEAR]: ValueFieldMetadata = {
    description: 'In what year will construction start?',
    displayName: 'Construction Year',
    isRequired: true,
    type: Number,
  };
  [DECOMISSIONING_COST]: ValueFieldMetadata = {
    displayName: 'Decomissioning Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$',
    description: 'The cost to decommission this technology when it reaches its expected lifetime end',
  };
  [EXPECTED_LIFETIME]: ValueFieldMetadata = {
    displayName: 'Expected Lifetime',
    isRequired: true,
    minValue: 1,
    type: Number,
    description: 'The number of years this technology will operate before new equipment is required to continue operation.',
    unit: 'years',
  };
  [MACRS_TERM]: ValueFieldMetadata = {
    displayName: 'MACRS Term',
    isRequired: true,
    type: Number,
    unit: 'years',
    description: 'Which MACRS GDS category does this technology fall into?',
    allowedValues: MACRS_TERMS,
  };
  [NAME]: ValueFieldMetadata = {
    displayName: 'Component Name',
    isRequired: true,
    type: String,
  };
  [OPERATION_YEAR]: ValueFieldMetadata = {
    description: 'In what year will operation start (COD)?',
    displayName: 'Operation Year',
    isRequired: true,
    type: Number,
  };
  [REPLACEABLE]: ValueFieldMetadata = {
    displayName: 'Replaceable?',
    isRequired: true,
    type: Boolean,
    description: 'Will this technology be replaced at its end of lifetime or not?',
    allowedValues: YES_NO_OPTIONS,
  };
  [REPLACEMENT_CONSTRUCTION_TIME]: ValueFieldMetadata = {
    displayName: 'Replacement Construction Time',
    isRequired: false, // based on REPLACEABLE
    minValue: 1,
    type: Number,
    description: 'The time it takes to finish equipment replacement construction',
    unit: 'years',
  };
  [SALVAGE_OPTION]: ValueFieldMetadata = {
    defaultValue: null,
    displayName: 'Salvage Value',
    isRequired: true,
    type: String,
    unit: null,
    description: 'Applies a financial benefit in the last year of the analysis window if the resource is not beyond its end of life. <b>Sunk Cost</b> means that there is no end of analysis value (salvage value = 0), <b>Linear Salvage Value</b> which will calculate salvage value by multiplying the technology\'s capital cost by (remaining life/total life), or <b>User Defined</b> to specify the exact salvage value of the technology.',
    allowedValues: SALVAGE_OPTIONS,
  };
  [SALVAGE_VALUE]: ValueFieldMetadata = {
    displayName: 'User-defined Salvage Value',
    isRequired: false, // based on SALVAGE_OPTION
    minValue: 0,
    type: Number,
    unit: '$',
    description: 'The exact present day value of salvaging this equipment at the end of the project.',
  };
  [TER]: ValueFieldMetadata = {
    displayName: 'Technology Escalation Rate',
    isRequired: true,
    minValue: -100,
    maxValue: 100,
    type: Number,
    unit: '%',
    description: 'The rate at which this technology\'s cost increases or decreases in cost each year. A negative value indicates the technology is decreasing in cost over time. A value equal to the inflation rate indicates that the real cost of the technology is constant.',
  };
}
