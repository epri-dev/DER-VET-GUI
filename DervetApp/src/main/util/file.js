import fs from 'fs';

const parseCsvFromFile = (filePath, fieldName) => (
  new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err === null) {
        resolve({ [fieldName]: data });
      } else {
        reject(err);
      }
    });
  })
);

const writeCsvToFile = (filePath, csv) => (
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, csv, (err) => {
      if (err === null) {
        resolve();
      }
      reject(err);
    });
  })
);

const writeJsonToFile = (filePath, json) => (
  new Promise((resolve, reject) => {
    fs.writeFile(filePath, JSON.stringify(json), 'utf8', (err) => {
      if (err === null) {
        resolve();
      }
      reject(err);
    });
  })
);

export default { parseCsvFromFile, writeCsvToFile, writeJsonToFile };
