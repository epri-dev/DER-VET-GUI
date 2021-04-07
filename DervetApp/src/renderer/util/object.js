import _ from 'lodash';

const operateOnKeysList = (obj, fieldList, callback) => (
  _.mapValues(_.pick(obj, fieldList), callback)
);

export default operateOnKeysList;
