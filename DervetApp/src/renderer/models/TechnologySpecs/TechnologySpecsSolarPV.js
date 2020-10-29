// TODO-- add validators here as neeeded, for vuelidate
import { required, minValue, decimal } from 'vuelidate/lib/validators';
import { sharedValidation } from './Shared.js';

/*
const defaults = {
  active: false,
  constructionDate: '',
  cost: 0,
  generationProfile: null,
  id: '',
  inverterMax: 1000000000,
  loc: '',
  macrsTerm: sharedDefaults.macrsTerm,
  name: '',
  operationDate: '',
  ratedCapacity: 0,
  shouldSize: true,
  tag: 'PV',
  technologyType: 'Intermittent Resource',
};
*/

const validation = {
  active: {
    isOptional: true,
    valType: Boolean,
    defaultVal: false,
  },
  constructionDate: {
    isOptional: true,
    valType: Date,
    defaultVal: undefined,
    displayName: 'Construction Date',
  },
  cost: {
    valType: Number,
    defaultVal: 0,
    min: 0,
    displayName: 'Cost per kW',
    unit: '$/kW',
    description: 'Capital cost per kW of rated power capacity (applied in year 0 of the analysis)',
    schemaKey: 'ccost_kW',
  },
  generationProfile: {
    valType: Object,
    defaultVal: null,
  },
  id: {
    valType: String,
    defaultVal: '',
  },
  inverterMax: {
    valType: Number,
    defaultVal: 1e9,
    min: 0,
    displayName: 'Solar (+storage) Inverter Rating (kVA)',
    unit: 'kW',
  },
  loc: {
    valType: String,
    defaultVal: undefined,
    displayName: 'Coupled System Type',
    allowedValues: ['AC', 'DC'],
    description: 'Solar plus storage AC or DC coupled system',
  },
  macrsTerm: sharedValidation.macrsTerm,
  name: {
    valType: String,
    defaultVal: '',
    displayName: 'Name',
  },
  operationDate: {
    isOptional: true,
    valType: Date,
    defaultVal: undefined,
    displayName: 'Operation Date',
  },
  ratedCapacity: {
    valType: Number,
    defaultVal: 0,
    displayName: 'Rated Capacity',
    unit: 'kW',
  },
  shouldSize: {
    valType: Boolean,
    defaultVal: true,
    displayName: 'Sizing',
    labelTrue: 'Have DER-VET size the Solar PV',
    labelFalse: 'Known size',
  },
  tag: {
    valType: String,
    defaultVal: 'PV',
  },
  technologyType: {
    valType: String,
    defaultVal: 'Intermittent Resource',
  },
};

// this format is required for vuelidate to work
//   it must be read in as 'validations'
// TODO: automate the creation of this from validation object above
const schemaValidations = {
  inputActive: { },
  inputConstructionDate: { },
  inputCost: { required, decimal, minValue: minValue(0) },
  inputGenerationProfile: { },
  inputId: { required },
  inputInverterMax: { required, decimal, minValue: minValue(0) },
  inputLoc: { required },
  inputMacrsTerm: { required, decimal },
  inputName: { required },
  inputOperationDate: { },
  inputRatedCapacity: { required, decimal },
  inputShouldSize: { required },
  inputTag: { required },
  inputTechnologyType: { required },
};

/*
NOTE: these are failed attempts to create schemaValidations,
      which vuelidate needs.

const schemaValidations = {};

Object.keys(validation).forEach((key) => {
  schemaValidations[key] = {};
  if (validation[key].isOptional !== true) {
    schemaValidations[key].required = function () { };
  }
  if (validation[key].vaslType === Number) {
    schemaValidations[key].decimal = function () { };
  }
});

if (validation.name.isOptional !== true) {
  schemaValidations.inputName = {
    required,
  };
}
let schemaValidations = {};

const inputCost = [];
if (validation.name.isOptional !== true) {
  inputCost.push('required');
}
if (validation.name.isOptional !== true) {
  inputCost.push('decimal');
}
if (validation.name.isOptional !== true) {
  inputCost.push('minValue');
}

schemaValidations = { inputCost };
*/

export default {
  validation,
  schemaValidations,
};
