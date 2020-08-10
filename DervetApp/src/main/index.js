/* eslint-disable */

const childProcess = require('child_process');
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

const createPythonProcess = () => {
  const pythonDirectory = path.resolve(__dirname, '../..', 'dervetpy')
  const pythonPath = path.join(pythonDirectory, 'venv/Scripts/python')
  const pythonScript = path.join(pythonDirectory, 'api.py')

  pythonProcess = childProcess.spawn(pythonPath, [pythonScript]);

  if (pythonProcess != null) {
    pythonProcess.stdout.on('data', (data) => {
      console.log(`python stdout: ${data}`);
    });
    pythonProcess.stderr.on('data', (data) => {
      console.error(`python stderr: ${data}`);
    });
  }
};

const exitPythonProcess = () => {
  // TODO also kill when webpack dev server restarts
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


/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'
autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})
app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
