import _ from 'lodash';
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
  try {
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName);
    }
    return dirName;
  } catch (err) {
    // TODO handle error properly
    throw err;
  }
};

export const papaParsePromise = file => new Promise((complete, error) => {
  // TODO move type conversion on CSV values to validation function
  Papa.parse(file, { complete, error, dynamicTyping: true });
});

const getFileFromEvent = e => e.target.files[0];

export const wrongFileType = (file, desiredFileType, successCallback) => {
  // return empty results array
  // add error Text (3rd argument)
  successCallback([], file.path, `Import Error: File type must be: <b>${desiredFileType}</b>`);
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
  const file = getFileFromEvent(e);
  if (file.type !== FILE_TYPE_CSV) {
    wrongFileType(file, FILE_TYPE_CSV, successCallback);
  } else {
    parseCsvFromFile(file, successCallback);
  }
  // TODO: also check file.size and have an upper limit to avoid
  //   import attempts for huge files- AE
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

export const writeJsonToFile = (filePath, json) => (
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(json), 'utf8', (err) => {
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
  // subtracting 1 is necessary here
  const origLinesCount = rows.length - 1;
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

export const getRootDirectoryFromWebkitEvent = (file) => {
  const full = file.path.split(path.sep);
  const overlap = findOverlap(file.path, file.webkitRelativePath).split(path.sep);
  return _.dropRight(full, overlap.length - 1).join(path.sep);
};
