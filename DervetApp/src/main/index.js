const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

import { app, BrowserWindow } from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9080'
  : `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 700,
    useContentSize: true,
    width: 1200,
  });

  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

/**
 * Spawn python process
 */

let pythonProcess = null;

const getPythonExe = () => path.join(process.resourcesPath, 'extraResources/api');

const pythonExeExists = exePath => fs.existsSync(exePath);

const getDevPythonDirectory = () => path.resolve(__dirname, '../..', 'dervetpy');

// TODO pass path to python runtime via environment variable
const getDevPythonRuntime = pythonDirectory => path.join(pythonDirectory, 'venv/bin/python3');

const getDevPythonScript = pythonDirectory => path.join(pythonDirectory, 'api.py');

const spawnPackagedPythonProcess = pythonExe => childProcess.execFile(pythonExe);

const spawnDevPythonProcess = () => {
  const pythonDirectory = getDevPythonDirectory();
  const pythonPath = getDevPythonRuntime(pythonDirectory);
  const pythonScript = getDevPythonScript(pythonDirectory);
  return childProcess.spawn(pythonPath, [pythonScript]);
};

const listenToPythonProcessLogs = (pythonProcess) => {
  pythonProcess.stdout.on('data', (data) => {
    console.log(`python stdout: ${data}`); // eslint-disable-line
  });
  pythonProcess.stderr.on('data', (data) => {
    console.error(`python stderr: ${data}`); // eslint-disable-line
  });
};

const createPythonProcess = () => {
  const pythonExe = getPythonExe();

  // getPythonExe is used to determine whether this code is running within the
  // packaged application: if the packaged python api executable does not exist
  // in the expected directory, we assume we are running in the development
  // environment and the raw python code is called.
  if (pythonExeExists(pythonExe)) {
    pythonProcess = spawnPackagedPythonProcess(pythonExe);
  } else {
    pythonProcess = spawnDevPythonProcess();
  } // TODO handle case where neither executable nor source exists

  if (pythonProcess != null) {
    listenToPythonProcessLogs(pythonProcess);
  }
};

const exitPythonProcess = () => {
  pythonProcess.kill();
  pythonProcess = null;
};

/**
 * Application event handlers
 */

app.on('ready', createWindow);
app.on('ready', createPythonProcess);

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('will-quit', exitPythonProcess);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
