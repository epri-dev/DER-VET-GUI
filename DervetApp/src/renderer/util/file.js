import Papa from 'papaparse';

export const papaParsePromise = file => new Promise((complete, error) => {
  // TODO move type conversion on CSV values to validation function
  Papa.parse(file, { complete, error, dynamicTyping: true });
});

const getFileFromEvent = e => e.target.files[0];

export const parseCsvFromFile = (file, successCallback) => {
  papaParsePromise(file)
    .then((results) => {
      successCallback(results.data);
    });
  // TODO add catch with errorCallback
};

export const parseCsvFromEvent = (e, successCallback) => {
  const file = getFileFromEvent(e);
  parseCsvFromFile(file, successCallback);
};

// TODO add test
export const objectToCsv = (data, fields, headers) => {
  const csvData = Papa.unparse({ data, fields }, { header: false });
  const csvHeaders = Papa.unparse({ fields: headers, data: [] });
  return `${csvHeaders}${csvData}`;
};

export const papaParseCsvString = (csvString, autoDetectHeader = false) => {
  if (csvString === undefined) {
    return null;
  }
  return Papa.parse(csvString, { header: autoDetectHeader, dynamicTyping: true });
};

export const formatCsvForHref = csv => `data:text/csv;charset=utf-8,${encodeURI(csv)}`;
