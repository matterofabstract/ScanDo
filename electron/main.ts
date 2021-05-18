/**   _____                  ____
 *   / ___/_________ _____  / __ \____
 *   \__ \/ ___/ __ `/ __ \/ / / / __ \
 *  ___/ / /__/ /_/ / / / / /_/ / /_/ /
 * /____/\___/\__,_/_/ /_/_____/\____/
 * ====================================
 * © 2021 Abstractly, LLC. All rights reserved.
 *
 * You have arrived.
 *
 * ScanDo's [electron] main process entrypoint file. The Electron side of things
 * is fairly minimal. Besides getting access to system-level features and
 * control through Electron, ScanDo lives in the frontend.
 *
 * 1. Setup and create the Electron window that ScanDo will run in.
 * 2. Listens for and manages ScanDo window lifecylce events.
 *
 */

// @ts-nocheck

require('./core');

const path = require('path');
const { app, BrowserWindow } = require('electron');
const serve = require('electron-serve');
const Store = require('electron-store');

const { getRenderProcessUrl, getPreloadPath } = require('./core/utils');

// declare let MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

const loadURL = serve({ directory: 'public' });

const store = new Store();

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

function isDev() {
    return !app.isPackaged;
}

const createWindow = () => {
    mainWindow = new BrowserWindow({
        backgroundColor: '#191919',
        minWidth: 391,
        maxWidth: 391,
        minHeight: 420,
        width: store.get('window_dimensions.width') || 391,
        height: store.get('window_dimensions.height') || 510,
        title: 'ScanDo',
        frame: false,
        titleBarStyle : 'hidden',
        hasShadow: true,
        webPreferences: {
            nativeWindowOpen: true,
            allowRunningInsecureContent: false,
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false,
            sandbox: true,
            preload: getPreloadPath()
        },
        icon: isDev() ? path.join(process.cwd(), 'public/favicon.png') : path.join(__dirname, 'public/favicon.png'),
        show: false
    });

    mainWindow.loadURL(getRenderProcessUrl());
    // if (isDev()) {
    //     mainWindow.loadURL('http://localhost:5000/');
    // } else {
    //     loadURL(mainWindow);
    // }

    // Open the DevTools and also disable Electron Security Warning.
    process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = true;
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    });

    // Emitted when the window is ready to be shown
    // This helps in showing the window gracefully.
    mainWindow.once('ready-to-show', () => {
        mainWindow.show()
    });
}

/**
 * Emitted once, when Electron has finished initializing. On macOS, launchInfo
 * holds the userInfo of the NSUserNotification that was used to open the
 * application, if it was launched from Notification Center. You can also call
 * app.isReady() to check if this event has already fired and app.whenReady()
 * to get a Promise that is fulfilled when Electron is initialized.
 */
app.on('ready', async () => {
    createWindow();
});

/**
 * Emitted when all windows have been closed. If you do not subscribe to this
 * event and all windows are closed, the default behavior is to quit the app;
 * however, if you subscribe, you control whether the app quits or not. If the
 * user pressed Cmd + Q, or the developer called app.quit(), Electron will first
 * try to close all the windows and then emit the will-quit event, and in this
 * case the window-all-closed event would not be emitted.
 */
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

/**
 * Emitted when the application is activated. Various actions can trigger this
 * event, such as launching the application for the first time, attempting to
 * re-launch the application when it's already running, or clicking on the
 * application's dock or taskbar icon.
 */
app.on('activate', () => {
    mainWindow.show();
});
