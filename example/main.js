'use strict';

const app = require('app');
const BrowserWindow = require('browser-window');  // Module to create native browser window.
const crashReporter = require('crash-reporter');

var WindowManagerServer = require('../src/window_manager_server.js');

// Report crashes to our server.
crashReporter.start();

var windowManagerServer = new WindowManagerServer({
  mainWindow: {
    create: function() {
      var mainWindow = new BrowserWindow({width: 1024, height: 768});
      mainWindow.openDevTools();
      // and load the index.html of the app.
      mainWindow.loadURL('file://' + __dirname + '/app/mainWindow.html');
      return mainWindow;
    }
  }
});

// register ipc to dispatch events
windowManagerServer.registerIPC();

// Quit when all windows are closed.
app.on('window-all-closed', function() {
  // if (process.platform != 'darwin')
    app.quit();
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function() {
  windowManagerServer.open('mainWindow');
});
