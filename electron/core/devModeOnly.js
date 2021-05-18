'use strict';
const { app, BrowserWindow } = require('electron');
const { isDev } = require('../utils/isDev');

/**
 * Things to run when only in development-mode.
 */

// Google Chrome Exntension ID for https://github.com/RedHatter/svelte-devtools
const SVELTE_DEVELOPER_TOOLS = 'ckolcbmkjpjmangdbmnkpjigpkddpogn';

(async () => {
  if (isDev) {
    await app.whenReady();
    const { default: installExtension } = require('electron-devtools-installer');
    installExtension(SVELTE_DEVELOPER_TOOLS)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
    BrowserWindow.getFocusedWindow() && BrowserWindow.getFocusedWindow()?.webContents.openDevTools('undocked');
  }
})();
