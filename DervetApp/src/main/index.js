import log from 'electron-log';
import { callDervet, readDervetResults, writeDervetInputs, exitPythonProcess } from './service/dervet';
import menuConfig from './util/menu';
require('dotenv').config();
import { app, BrowserWindow, ipcMain, Menu } from 'electron'; // eslint-disable-line

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
    webPreferences: {
      // TODO refactor to use contextIntegration https://github.com/electron/electron/issues/23506
      nodeIntegration: true,
      enableRemoteModule: true,
      webSecurity: false,
    },
  });

  mainWindow.loadURL(winURL);

  // Configure application menu
  const menu = Menu.buildFromTemplate(menuConfig);
  Menu.setApplicationMenu(menu);

  // Open dev tools initially when in development mode
  if (process.env.NODE_ENV === 'development') {
    mainWindow.webContents.on('did-frame-finish-load', () => {
      mainWindow.webContents.openDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function sendResults(event, results, resultsPath) {
  event.sender.send('dervet-results', Object.assign(...results, { resultsPath }));
}

function registerIpcChannels() {
  ipcMain.on('dervet-inputs', (event, dervetInputs) => {
    const { modelParametersPath, resultsPath } = dervetInputs.meta;

    // TODO catch file-writing errors
    Promise.all(writeDervetInputs(dervetInputs, modelParametersPath))
      .then(() => callDervet(modelParametersPath))
      .then(() => readDervetResults(resultsPath, dervetInputs.expectedResultCsvs))
      .then(results => sendResults(event, results, resultsPath))
      .catch((err) => {
        const errMessage = JSON.stringify(err);
        log.error(errMessage);
        event.sender.send('dervet-error', errMessage);
      });
  });

  ipcMain.on('kill-dervet', () => {
    exitPythonProcess();
    // TODO set runInProgress to false
  });
}

/**
 * Application event handlers
 */

app.on('ready', createWindow);
app.on('ready', registerIpcChannels);

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => exitPythonProcess());
