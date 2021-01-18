import _ from 'lodash';
import childProcess from 'child_process';
import fs from 'fs';
import path from 'path';
import log from 'electron-log';

import { parseCsvFromFile, writeCsvToFile, writeJsonToFile } from '../util/file';

const DERVET_SCRIPT_NAME = 'run_DERVET';

const writeCsvsToFile = csvs => (
  csvs.map(({ filePath, csv }) => writeCsvToFile(filePath, csv))
);

export const writeDervetInputs = (inputs, path) => {
  const csvPromises = writeCsvsToFile(inputs.inputCsvs);
  const modelParametersPromise = writeJsonToFile(path, inputs.modelParameters);
  return csvPromises.concat(modelParametersPromise);
};

const getExeFileName = () => {
  // Note that this will return win32 even on 64-bit Windows
  if (process.platform === 'win32') {
    return `${DERVET_SCRIPT_NAME}.exe`;
  }
  return DERVET_SCRIPT_NAME;
};

const getPythonExe = () => (
  path.join(process.resourcesPath, 'extraResources', getExeFileName())
);

const pythonExeExists = exePath => fs.existsSync(exePath);

const getDevPythonRuntime = () => process.env.DERVET_PYTHON_RUNTIME;

const getDevPythonScript = () => process.env.DERVET_PYTHON_SCRIPT;

const spawnPackagedPythonProcess = (pythonExe, modelParametersPath) => (
  childProcess.execFile(pythonExe, [modelParametersPath])
);

const spawnDevPythonProcess = (modelParametersPath) => {
  const pythonPath = getDevPythonRuntime();
  const pythonScript = getDevPythonScript();
  return childProcess.spawn(pythonPath, [pythonScript, modelParametersPath]);
};

// TODO refactor into a python service
const listenToPythonProcessLogs = (pythonProcess) => {
  pythonProcess.stdout.on('data', (data) => {
    log.info(data);
    console.log(`python stdout: ${data}`); // eslint-disable-line
  });
  pythonProcess.stderr.on('data', (data) => {
    log.info(data);
    console.error(`python stderr: ${data}`); // eslint-disable-line
  });
};

const listenForExit = pythonProcess => (
  new Promise((resolve, reject) => {
    pythonProcess.on('exit', (val) => {
      if (val === 0) {
        resolve(val);
      } else {
        reject(new Error('DERVET run error'));
      }
    });
  })
);

// TODO will use this eventually
// const exitPythonProcess = () => {
//   pythonProcess.kill();
//   pythonProcess = null;
// };

export const callDervet = (modelParametersPath) => {
  console.log('Spawning DERVET subprocess...'); // eslint-disable-line

  let pythonProcess = null;
  const pythonExe = getPythonExe();

  // getPythonExe is used to determine whether this code is running within the
  // packaged application: if the packaged python executable does not exist
  // in the expected directory, we assume we are running in the development
  // environment and the raw python code is called.
  if (pythonExeExists(pythonExe)) {
    pythonProcess = spawnPackagedPythonProcess(pythonExe, modelParametersPath);
  } else {
    pythonProcess = spawnDevPythonProcess(modelParametersPath);
  } // TODO handle case where neither executable nor source exists

  if (pythonProcess != null) {
    listenToPythonProcessLogs(pythonProcess);
    return listenForExit(pythonProcess);
  }
  return new Promise((_, reject) => { reject(new Error('Failed to spawn python process')); });
};

export const readDervetResults = (resultsPath, expectedResultCsvs) => {
  console.log('Reading dervet results...'); // eslint-disable-line

  const promises = _.map(expectedResultCsvs, (csvMeta) => {
    const filePath = path.join(resultsPath, csvMeta.fileName);
    return parseCsvFromFile(filePath, csvMeta.fieldName);
  });

  return Promise.all(promises);
};
