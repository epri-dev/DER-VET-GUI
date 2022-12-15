import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { TimeSeriesFieldMetadata } from '@/models/Project/Metadata/TimeSeriesField';
import { TechnologyMetadata } from '@/models/Project/Metadata/TechnologySpecs/Technology';
import { TS_CONTROLLABLE_LOAD_PROFILE } from '@/models/Project/constants';

export default class TechnologySpecsControllableLoadMetadata extends TechnologyMetadata {
  capitalCost: ValueFieldMetadata = {
    displayName: 'Capital Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$',
    description: 'Capital cost of infrastructure for Controllable Load',
  };
  duration: ValueFieldMetadata = {
    displayName: 'Duration',
    isRequired: true,
    minValue: 1, // differs from schema; want gt 0
    type: Number,
    unit: 'hours',
    description: 'Maximum time that the load can be shut off or turned down for.',
  };
  fixedOMCosts: ValueFieldMetadata = {
    displayName: 'Fixed O&M Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / yr',
    description: 'Cost of maintaining the infrastructure',
  };
  ratedCapacity: ValueFieldMetadata = {
    displayName: 'Rated Capacity',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: 'kW ',
    description: 'Maximum offset from the original load.',
  };
  replacementCost: ValueFieldMetadata = {
    displayName: 'Replacement Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ ',
    description: 'Total cost of replacing infrastructure for Controllable Load.',
  };
  [TS_CONTROLLABLE_LOAD_PROFILE]: TimeSeriesFieldMetadata = {
    displayName: 'maximum load profile',
    columnHeaderName: 'Site Load (kW)',
    sampleDataFileName: 'ControllableLoad',
    tsName: TS_CONTROLLABLE_LOAD_PROFILE,
    isMonthly: false,
    unit: 'kW',
  };
}
