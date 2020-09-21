const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const writeCsvsToFile = csvs => csvs;

const writeModelParametersToFile = modelParameters => modelParameters;

const writeDervetInputs = (inputs) => {
  writeCsvsToFile(inputs.csvs);
  writeModelParametersToFile(inputs.modelParameters);
};

const getPythonExe = () => path.join(process.resourcesPath, 'extraResources/api');

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
    console.log(`python stdout: ${data}`); // eslint-disable-line
  });
  pythonProcess.stderr.on('data', (data) => {
    console.error(`python stderr: ${data}`); // eslint-disable-line
  });
};

// TODO will use this eventually
// const exitPythonProcess = () => {
//   pythonProcess.kill();
//   pythonProcess = null;
// };

const callDervet = (modelParametersPath) => {
  console.log('Spawning DERVET subprocess'); // eslint-disable-line

  let pythonProcess = null;
  const pythonExe = getPythonExe();

  // getPythonExe is used to determine whether this code is running within the
  // packaged application: if the packaged python api executable does not exist
  // in the expected directory, we assume we are running in the development
  // environment and the raw python code is called.
  if (pythonExeExists(pythonExe)) {
    pythonProcess = spawnPackagedPythonProcess(pythonExe);
  } else {
    pythonProcess = spawnDevPythonProcess(modelParametersPath);
  } // TODO handle case where neither executable nor source exists

  if (pythonProcess != null) {
    listenToPythonProcessLogs(pythonProcess);
  }
};

export default {
  writeDervetInputs,
  callDervet,
};
