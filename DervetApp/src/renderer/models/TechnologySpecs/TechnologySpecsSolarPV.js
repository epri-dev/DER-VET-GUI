// import { required, minValue, decimal } from 'vuelidate/lib/validators';
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
  },
  cost: {
    valType: Number,
    defaultVal: 0,
    min: 0,
    displayName: 'Cost per kW',
    unit: '$/kW',
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
  },
  loc: {
    valType: String,
    defaultVal: '',
    allowedValues: ['AC', 'DC'],
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
    defaultVal: '',
  },
  ratedCapacity: {
    valType: Number,
    defaultVal: 0,
  },
  shouldSize: {
    valType: Boolean,
    defaultVal: true,
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


/*
const schemaValidations = {
  inputCost: { required, decimal, minValue: minValue(0) },
  inputName: { required },
};

Object.keys(validation).map(key {
  schemaValidations[key] = 7;
});

for (const [key, params] of Object.entries(validation)) {
  schemaValidations[key] = 7;
}


const keys = Object.keys(validation);
keys.forEach((key) => {
  if (validation.name.isOptional !== true) {
    schemaValidations[key] = {
      required,
    };
  }
}

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
  // schemaValidations,
};
