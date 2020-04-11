require('./core/');

const path = require('path');
const { app, BrowserWindow } = require('electron');

const { isDev } = require('./utils');

let mainWindow = null;

/**
 * Electron Main Process File
 */

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 340,
    height: 630,
    title: 'ScanDo',
    frame: false,
    transparent: true,
    webPreferences: {
      nodeIntegration: true,
    },
    minWidth: 340,
    minHeight: 400,
  });
}

app.on('ready', () => {
  createWindow();
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);
  mainWindow.on('closed', () => (mainWindow = null));
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
