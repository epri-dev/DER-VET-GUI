import DervetService from './service/dervet';

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
    const modelParametersPath = ''; // TODO get from dervetInputs
    // TODO Account for async writing before calling DERVET
    DervetService.writeDervetInputs(dervetInputs);
    DervetService.callDervet(modelParametersPath);
    event.sender.send('dervet-results', 'done');
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
