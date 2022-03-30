import { ValueFieldMetadata } from '@/models/Project/Metadata/ValueField';
import { TechnologyMetadata } from '@/models/Project/Metadata/TechnologySpecs/Technology';

export default class TechnologySpecsSingleEVMetadata extends TechnologyMetadata {
  capitalCost: ValueFieldMetadata = {
    displayName: 'Capital Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$',
    description: 'Capital cost of infrastructure for EV charging',
  };
  energyTarget: ValueFieldMetadata = {
    displayName: 'Energy Target',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: 'kWh',
    description: 'Energy to be collected during charge',
  };
  fixedOMCosts: ValueFieldMetadata = {
    displayName: 'Fixed O&M Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ / yr',
    description: 'Cost of maintaining the charging infrastructure',
  };
  maximumChargingPower: ValueFieldMetadata = {
    displayName: 'Maximum Charging Power',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: 'kW',
    description: 'Maximum allowed charging power',
  };
  minimumChargingPower: ValueFieldMetadata = {
    displayName: 'Minimum Charging Power',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: 'kW',
    description: 'Minimum allowed charging power',
  };
  plugInHour: ValueFieldMetadata = {
    displayName: 'Plug-in Hour',
    isRequired: true,
    minValue: 0,
    maxValue: 22,
    type: 'int',
    unit: 'hb',
    description: 'Hour of the day when EV is plugged-in',
  };
  plugOutHour: ValueFieldMetadata = {
    displayName: 'Plug-out Hour',
    isRequired: true,
    minValue: 0,
    maxValue: 23,
    type: 'int',
    unit: 'hb',
    description: 'Hour of the day when EV is plugged-out',
  };
  replacementCost: ValueFieldMetadata = {
    displayName: 'Replacement Cost',
    isRequired: true,
    minValue: 0,
    type: Number,
    unit: '$ ',
    description: 'Total cost of replacing infrastructure for EV charging',
  };
}
