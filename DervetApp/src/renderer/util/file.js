import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

export const getAppDataPath = () => {
  const appName = 'DER-VET'; // TODO get from a common place
  switch (process.platform) {
    case 'darwin': {
      return path.join(process.env.HOME, 'Library', 'Application Support', appName);
    }
    case 'win32': {
      return path.join(process.env.APPDATA, appName);
    }
    case 'linux': {
      return path.join(process.env.HOME, '.myApp');
    }
    default: {
      throw new Error('Unsupported platform!');
    }
  }
};

export const createDirectory = (dirName) => {
  // TODO handle error properly and replace with fsPromise
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName, { recursive: true });
  }
  return dirName;
};

export const papaParsePromise = file => new Promise((complete, error) => {
  // TODO move type conversion on CSV values to validation function
  Papa.parse(file, { complete, error, dynamicTyping: true });
});

const getFileFromEvent = e => e.target.files[0];

export const wrongFileType = (file, desiredFileType, successCallback) => {
  // return empty results array
  // add error Text (3rd argument)
  successCallback([], file.path, `<b>Import Error</b>: File type must be: <b>${desiredFileType}</b>`);
};

export const parseCsvFromFile = (file, successCallback) => {
  papaParsePromise(file)
    .then((results) => {
      successCallback(results.data, file.path);
    });
  // TODO add catch with errorCallback
};

export const parseCsvFromEvent = (e, successCallback) => {
  const FILE_TYPE_CSV = 'text/csv';
  const FILE_TYPE_XCEL = 'application/vnd.ms-excel';
  const file = getFileFromEvent(e);
  if (file) {
    if (file.type === FILE_TYPE_CSV || file.type === FILE_TYPE_XCEL) {
      parseCsvFromFile(file, successCallback);
    } else {
      wrongFileType(file, FILE_TYPE_CSV, successCallback);
    }
    // TODO: AE: also check file.size and have an upper limit to avoid
    //   import attempts for huge files
  } else {
    successCallback([], null, '');
  }
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

export const writeObjectToFile = (filePath, obj) => (
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(obj, null, 2), 'utf8', (err) => {
      if (err === null) {
        resolve();
      }
      reject(err);
    });
  })
);

export const readJsonFromFile = filePath => (
  new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err === null) {
        resolve(JSON.parse(data));
      }
      reject(err);
    });
  })
);

export const filterRowsByColumnCount = (rows, validRowLength) => {
  let importNotes = null;
  const origLinesCount = rows.length;
  rows = rows.filter(row => row.length === validRowLength);
  const postLinesCount = rows.length;
  const removedLinesCount = origLinesCount - postLinesCount;
  if (removedLinesCount > 0) {
    const wasOrWere = (removedLinesCount === 1) ? 'was' : 'were';
    importNotes = `${removedLinesCount} out of ${origLinesCount} lines did not have
      the required ${validRowLength} columns of data, and ${wasOrWere} skipped`;
  }
  return { rows, importNotes };
};

export const findOverlap = (a, b) => {
  if (b.length === 0) return '';
  if (a.endsWith(b)) return b;
  if (a.indexOf(b) >= 0) return b;
  return findOverlap(a, b.substring(0, b.length - 1));
};
