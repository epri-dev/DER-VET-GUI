import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';

import ProjectFieldMetadata from '@/models/Project/FieldMetadata';
import { SHARED_DYNAMIC_FIELDS, createSharedHardcodedMetadata } from '@/models/Project/TechnologySpecs/sharedConstants';
import { optionsYN, makeAllowedValuesWithNull } from '@/models/Project/constants';
import { TECH_SPECS_PV } from '@/router/constants';

const PV = 'PV';

// TODO parse these from schema
const SIZING_ALLOWED_VALUES = [
  {
    value: true,
    label: 'Have DER-VET size the Solar PV',
  },
  {
    value: false,
    label: 'Known size',
  },
];
const LOC_ALLOWED_VALUES = makeAllowedValuesWithNull(['AC', 'DC']);

const DYNAMIC_FIELDS = [
  ...SHARED_DYNAMIC_FIELDS,
  'allowGridCharge',
  'cost',
  'fixedOMCosts',
  'gamma',
  'includeCurtailment',
  'includeSizeLimits',
  'includePPA',
  'inverterMax',
  'loc',
  'nu',
  'ppaCost',
  'ppaInflationRate',
  'ratedCapacity',
  'ratedCapacityMaximum',
  'ratedCapacityMinimum',
  'replacementCost',
  'shouldSize',
];

const sharedHardcodedMetadata = createSharedHardcodedMetadata(PV);

export default class TechnologySpecsSolarPVMetadata {
  constructor(arg) {
    Object.assign(this, arg);
  }

  operateOnDynamicFields(callback) {
    return _.mapValues(_.pick(this, DYNAMIC_FIELDS), callback);
  }

  getDefaultValues() {
    return {
      active: true,
      complete: null,
      errorList: [],
      generationProfile: null,
      id: uuidv4(),
      path: TECH_SPECS_PV,
      tag: PV,
      technologyType: 'Intermittent Resource',
      ...this.operateOnDynamicFields(f => f.defaultValue),
    };
  }

  toValidationSchema() {
    return this.operateOnDynamicFields(f => f.toValidationSchema());
  }

  // to be removed in favor of getMetadataFromSchema
  static getHardcodedMetadata() {
    return new TechnologySpecsSolarPVMetadata({
      allowGridCharge: new ProjectFieldMetadata({
        displayName: 'Allow Grid Charging',
        isRequired: true,
        type: Boolean,
        allowedValues: optionsYN,
        description: 'Allow the PV+ESS AC-coupled system to charge from the grid',
      }),
      cost: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Cost per kW<sub>AC</sub>',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$/kW<sub>AC</sub>',
        description: 'Capital cost per kW<sub>AC</sub> of rated power capacity (applied in year 0 of the analysis)',
        allowedValues: null,
      }),
      fixedOMCosts: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Fixed O&M Costs',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$ / kW-year',
        description: 'What is the cost of fixed operations and maintenance for the PV system?',
        allowedValues: null,
      }),
      gamma: new ProjectFieldMetadata({
        displayName: 'Timestep Percentage of PV Minimum Generation',
        isRequired: false, // based off IF reliability is included as a service
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '%',
        description: 'Worst-case percent of the timestep for which PV is at it\'s minimum generation (default=43)',
      }),
      includeCurtailment: new ProjectFieldMetadata({
        displayName: 'Allow curtailment?',
        isRequired: true,
        type: Boolean,
        allowedValues: optionsYN,
        description: 'Select \'yes\' to allow the PV to curtail its generation below its maximum generating level (which is set by the system size and the weather). This adds PV curtailment as an optimization variable (longer runtime) but can avoid constraint conflicts associated with overgeneration',
      }),
      includePPA: new ProjectFieldMetadata({
        displayName: 'Power Purchasing Agreement?',
        isRequired: true,
        type: Boolean,
        allowedValues: optionsYN,
        description: 'Do you want to calculate the annual PV energy cost as a Power Purchase Agreement (PPA)?',
      }),
      includeSizeLimits: new ProjectFieldMetadata({
        displayName: 'Include limits on capacity sizing?',
        isRequired: true,
        type: Boolean,
        allowedValues: optionsYN,
        description: 'Advanced sizing settings.',
      }),
      inverterMax: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Solar (+storage) Inverter Rating (kVA)',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: 'kW<sub>AC</sub>',
        description: null,
        allowedValues: null,
      }),
      loc: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Coupled System Type',
        isRequired: true,
        type: String,
        unit: null,
        description: 'Solar plus storage AC or DC coupled system',
        allowedValues: LOC_ALLOWED_VALUES,
      }),
      nu: new ProjectFieldMetadata({
        displayName: 'Minimum Percentage of PV Generation',
        isRequired: false, // based off IF reliability is included as a service
        minValue: 0,
        maxValue: 100,
        type: Number,
        unit: '%',
        description: 'Percent of the timestep for which PV is at its minimum generation',
      }),
      ppaCost: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'PPA Cost',
        isRequired: false, // based on includePPA
        minValue: 0,
        type: Number,
        unit: '$/kW<sub>AC</sub>h',
        description: 'What is the cost of the power purchase agreement?',
        allowedValues: null,
      }),
      ppaInflationRate: new ProjectFieldMetadata({
        displayName: 'Inflation Rate',
        isRequired: false, // based on includePPA
        minValue: -100,
        maxValue: 100,
        type: Number,
        unit: '%',
        description: 'An escalation rate exclusively for the Solar PPA Cost (For operation year 2 onwards)',
      }),
      ratedCapacity: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Rated Capacity',
        isRequired: true,
        minValue: 1, // differs from schema; want gt 0
        type: Number,
        unit: 'kW<sub>AC</sub>',
        description: null,
        allowedValues: null,
      }),
      ratedCapacityMaximum: new ProjectFieldMetadata({
        displayName: 'Rated Capacity Maximum',
        description: 'Upper limit on PV AC power capacity when optimally sizing',
        isRequired: false, // based on if sizing
        minValue: 0,
        type: Number,
        unit: 'kW<sub>AC</sub>',
      }),
      ratedCapacityMinimum: new ProjectFieldMetadata({
        displayName: 'Rated Capacity Minimum',
        description: 'Lower limit on PV AC power capacity when optimally sizing (this does not set a minimum power during operation)',
        isRequired: false, // based on if sizing
        minValue: 0,
        type: Number,
        unit: 'kW<sub>AC</sub>',
      }),
      replacementCost: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Replacement Cost per kW<sub>AC</sub>',
        isRequired: true,
        minValue: 0,
        type: Number,
        unit: '$/kW<sub>AC</sub>',
        description: 'Total cost of replacing the system at its end of life in $/kW of AC power capacity',
        allowedValues: null,
      }),
      shouldSize: new ProjectFieldMetadata({
        defaultValue: null,
        displayName: 'Sizing',
        isRequired: true,
        type: Boolean,
        unit: null,
        description: null,
        allowedValues: SIZING_ALLOWED_VALUES,
      }),
      ...sharedHardcodedMetadata,
    });
  }
}
