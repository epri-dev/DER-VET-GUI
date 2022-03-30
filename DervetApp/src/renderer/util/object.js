import _ from 'lodash';

const operateOnKeysList = (obj, fields) => (
  _.reduce(fields, (result, field) => {
    result[field] = obj[field];
    return result;
  }, {})
);

export default operateOnKeysList;
