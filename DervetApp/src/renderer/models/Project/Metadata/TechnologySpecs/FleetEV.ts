import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { TimeSeriesFieldMetadata } from '@/models/Project/Metadata/TimeSeriesField';
import { TechnologyMetadata } from '@/models/Project/Metadata/TechnologySpecs/Technology';

export default class TechnologySpecsFleetEVMetadata extends TechnologyMetadata {
  capitalCost: ValueFieldMetadata = {
    displayName: 'Capital Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$',
    description: 'Capital cost of infrastructure for EV charging',
  };
  fixedOMCosts: ValueFieldMetadata = {
    displayName: 'Fixed O&M Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$/yr',
    description: 'Cost of maintaining the charging infrastructure',
  };
  lostLoadCost: ValueFieldMetadata = {
    displayName: 'Cost of Lost Load',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$/kWh',
    description: 'What is the cost of reducing the EV load?',
  };
  maximumLoadCtrl: ValueFieldMetadata = {
    displayName: 'Maximum Load Control',
    isRequired: true,
    minValue: 0,
    maxValue: 100,
    type: Number,
    unit: '%',
    description: 'The percentage of EV load that can be relied upon for grid services',
  };
  replacementCost: ValueFieldMetadata = {
    displayName: 'Replacement Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$',
    description: 'Total cost of replacing infrastructure for EV charging',
  };
  tsFleetEVBaselineLoadProfile: TimeSeriesFieldMetadata = {
    defaultValue: [],
    displayName: 'baseline load profile',
    columnHeaderName: 'EV fleet',
    sampleDataFileName: 'FleetEVBaselineLoad',
    tsName: 'tsFleetEVBaselineLoadProfile',
    isMonthly: false,
    unit: '', // TODO ?
  };
}
