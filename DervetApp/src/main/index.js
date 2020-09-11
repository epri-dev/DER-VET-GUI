const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

import { app, BrowserWindow, ipcMain } from 'electron' // eslint-disable-line

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

/**
 * TODO: This line disables security warnings that show when using webpack dev server
 * for development and don't represent an actual risk. However, we shouldn't suppress
 * legitimate security warnings, so a better way to get rid of these warnings is to
 * upgrade to a newer version of electron that includes this fix:
 * https://github.com/electron/electron/pull/18814
 */
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = true;

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


function registerIpcChannels() {
  ipcMain.on('dervet-inputs', (event, dervetInputs) => {
    const results = { data: [dervetInputs] }; // TODO: replace with DERVET run results
    event.sender.send('dervet-results', results);
  });
}

/**
 * Spawn python process
 */

let pythonProcess = null;

const getPythonExe = () => path.join(process.resourcesPath, 'extraResources/api');

const pythonExeExists = exePath => fs.existsSync(exePath);

const getDevPythonDirectory = () => path.resolve(__dirname, '../..', 'dervetpy');

const getDevPythonRuntime = () => process.env.DERVET_PYTHON_PATH;

const getDevPythonScript = pythonDirectory => path.join(pythonDirectory, 'api.py');

const spawnPackagedPythonProcess = pythonExe => childProcess.execFile(pythonExe);

const spawnDevPythonProcess = () => {
  const pythonDirectory = getDevPythonDirectory();
  const pythonPath = getDevPythonRuntime();
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

registerIpcChannels();
