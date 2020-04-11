const { app } = require('electron');

const isDev = () => {
  const app = electron.app || electron.remote.app;
  const isEnvSet = 'ELECTRON_IS_DEV' in process.env;
  const getFromEnv = parseInt(process.env.ELECTRON_IS_DEV, 10) === 1;
  return isEnvSet ? getFromEnv : !app.isPackaged;
};

const getSystemInfo = () => ({
  // 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
  platform: process.platform,

  // On macOS -> '10.13.6'
  // On Windows -> '10.0.17763'
  // On Linux -> '4.15.0-45-generic'
  version: process.getSystemVersion(),
});

exports.isDev = isDev;
exports.getSystemInfo = getSystemInfo;
