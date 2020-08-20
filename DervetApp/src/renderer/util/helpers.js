import { flatten } from 'lodash';
import Papa from 'papaparse';

const papaParsePromise = file => new Promise((complete, error) => {
  // TODO move type conversion on CSV values to validation function
  Papa.parse(file, { complete, error, dynamicTyping: true });
});

const getFileFromEvent = e => e.target.files[0];

const parseCsvFromFile = (e, successCallback) => {
  const file = getFileFromEvent(e);
  papaParsePromise(file)
    .then((results) => {
      const flatResults = flatten(results.data);
      successCallback(flatResults);
    });
  // TODO add catch with errorCallback
};

export default {
  parseCsvFromFile,
};
