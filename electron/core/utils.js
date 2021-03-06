/**
 * Electron-specific Utility Helpers authored by Billy Mays himself.
 */

const path = require('path');
const { app } = require('electron');

const isDev = () => {
  const thisApp = app
  const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
  const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
  return isEnvSet ? getFromEnv : !thisApp.isPackaged;
};

const getSystemInfo = () => ({
  // 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
  platform: process.platform,

  // On macOS -> '10.13.6'
  // On Windows -> '10.0.17763'
  // On Linux -> '4.15.0-45-generic'
  version: process.getSystemVersion()
});

/**
 * The url is a remote address (e.g. http://) if we're in development,
 * otherwise it's a path to the local HTML file using the file:// protocol.
 * More: https://www.electronjs.org/docs/api/browser-window#winloadurlurl-options
 */
const getRenderProcessUrl = () => (
  isDev()
    ? 'http://localhost:5000'
    : `file://${path.join(__dirname, '../../build/index.html')}`
)

const getPreloadPath = () => (
  path.join(app.getAppPath(), 'electron/core/preload.js')
);

exports.isDev = isDev;
exports.getSystemInfo = getSystemInfo;
exports.getRenderProcessUrl = getRenderProcessUrl;
exports.getPreloadPath = getPreloadPath;

// Kidding...
