import _ from 'lodash';

const convertToUpperCase = (str: string): string => (
  _.startCase(_.toLower(_.trim(str)))
);

export default convertToUpperCase;
