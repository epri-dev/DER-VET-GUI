import fs from 'fs';
import path from 'path';
import Papa from 'papaparse';

const EXTRA_RESOURCES = 'extraResources';

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

const getDevRootPath = () => path.resolve(__dirname).split('src').shift();

const getBuiltRootPath = () => process.resourcesPath;

const getRoot = () => {
  const devExtraResources = path.join(getDevRootPath(), EXTRA_RESOURCES);
  const builtExtraResources = path.join(getBuiltRootPath(), EXTRA_RESOURCES);
  return fs.existsSync(builtExtraResources) ? builtExtraResources : devExtraResources;
};

export const getExtraResourcesPath = (fileName, subDirectoryList = []) => (
  path.join(getRoot(), ...subDirectoryList, fileName)
);

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
    .then(({ data }) => {
      successCallback(data, file.path);
    });
  // TODO add catch with errorCallback
};

export const parseCsvFromEvent = (e, successCallback) => {
  const FILE_TYPE_CSV = 'text/csv';
  const FILE_TYPE_TXT = 'text/plain';
  const FILE_TYPE_XCEL = 'application/vnd.ms-excel';
  const file = getFileFromEvent(e);
  if (file) {
    if (file.type === FILE_TYPE_CSV
      || file.type === FILE_TYPE_TXT
      || file.type === FILE_TYPE_XCEL) {
      parseCsvFromFile(file, successCallback);
    } else {
      wrongFileType(file, FILE_TYPE_CSV, successCallback);
    }
    // TODO: AE: also check file.size and have an upper limit to avoid
    //   import attempts for huge files
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

export const readJsonFromFileSync = filePath => JSON.parse(fs.readFileSync(filePath));

export const fileUrl = (filePath, options = {}) => {
  if (typeof filePath !== 'string') {
    throw new TypeError(`Expected a string, got ${typeof filePath}`);
  }

  const { resolve = true } = options;

  let pathName = filePath;
  if (resolve) {
    pathName = path.resolve(filePath);
  }

  pathName = pathName.replace(/\\/g, '/');

  // Windows drive letter must be prefixed with a slash.
  if (pathName[0] !== '/') {
    pathName = `/${pathName}`;
  }

  // Escape required characters for path components.
  // See: https://tools.ietf.org/html/rfc3986#section-3.3
  return encodeURI(`file://${pathName}`).replace(/[?#]/g, encodeURIComponent);
};
