import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { TimeSeriesFieldMetadata } from '@/models/Project/Metadata/TimeSeriesField';
import { TechnologyMetadata } from '@/models/Project/Metadata/TechnologySpecs/Technology';
import { TS_CONTROLLABLE_LOAD_PROFILE } from '@/models/Project/constants';

export default class TechnologySpecsControllableLoadMetadata extends TechnologyMetadata {
  duration: ValueFieldMetadata = {
    displayName: 'Duration',
    isRequired: true,
    minValue: 1, // differs from schema; want gt 0
    type: Number,
    unit: 'hours',
    description: 'Maximum time that the load can be shut off or turned down for.',
  };
  ratedCapacity: ValueFieldMetadata = {
    displayName: 'Rated Capacity',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: 'kW ',
    description: 'Maximum offset from the original load.',
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
