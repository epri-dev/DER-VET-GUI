// TODO-- add validators here as neeeded, for vuelidate
import { required, minValue, decimal } from 'vuelidate/lib/validators';

// this format is required for vuelidate to work
//   it must be read in as 'validations'

const schemaValidations = {
  constructionDate: { },
  cost: { required, decimal, minValue: minValue(0) },
  inverterMax: { required, decimal, minValue: minValue(0) },
  loc: { required },
  macrsTerm: { required, decimal },
  name: { required },
  operationDate: { },
  ratedCapacity: { required, decimal },
  shouldSize: { required },
};

export default {
  schemaValidations,
};
