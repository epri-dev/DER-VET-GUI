import Papa from 'papaparse';

const papaParsePromise = file => new Promise((complete, error) => {
  Papa.parse(file, { complete, error, dynamicTyping: true });
});

const getFileFromEvent = e => e.target.files[0];

export default {
  papaParsePromise,
  getFileFromEvent,
};
