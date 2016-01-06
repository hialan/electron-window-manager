'use strict';
var BrowserWindow = require('browser-window');  // Module to create native browser window.
//var ipc = require('electron').ipcMain;
var ipc = require('ipc');

var instances = [];
var msg_queue = [];

function WindowManagerServer(windowDefinition) {
  // constructor: set variable
  this.window_definition = windowDefinition;
}

function sendMessage(window_name) {
  if(!instances.hasOwnProperty(window_name) || typeof instances[window_name] !== 'object') {
    return;
  }
  if(!msg_queue.hasOwnProperty(window_name) || typeof msg_queue[window_name] !== 'object') {
    return;
  }
  while(msg_queue[window_name].length > 0) {
    var obj = msg_queue[window_name].shift();
    instances[window_name].webContents.send('WindowManager', obj);
  }
}

WindowManagerServer.prototype.open = function(window_name) {
  if(instances.hasOwnProperty(window_name) && instances[window_name] != null) {
    return;
  }
  var wdef = this.window_definition[window_name];
  var instance = wdef.create();
  instance.on('closed', function () {
      instances[window_name] = null;
  });
  instances[window_name] = instance;
};

WindowManagerServer.prototype.close = function(window_name) {
  if(this.isOpened(window_name)) {
    instances[window_name].close();
  }
  return;
};

WindowManagerServer.prototype.isOpened = function(window_name) {
  if(instances.hasOwnProperty(window_name) && instances[window_name] != null) {
    return true;
  } else {
    return false;
  }
};

WindowManagerServer.prototype.handleChannelWindowManager = function(event, command) {
  if(command.action === 'open') {
    var window_name = command.data.name;
    var window_args = command.data.args;
    if(window_args !== undefined && window_args !== null) {
      if(!msg_queue.hasOwnProperty(window_name) || typeof msg_queue[window_name] !== 'array') {
        msg_queue[window_name] = [];
      }
      msg_queue[window_name].push(window_args);
    }
    if(this.isOpened(window_name)) {
      sendMessage(window_name);
    } else {
      this.open(window_name);
    }
  } else if (command.action === 'ready') {
    var window_name = command.data.name;
    sendMessage(window_name);
  } else if (command.action === 'send') {
    var window_name = command.data.target;
    var payload = command.data.payload;
    msg_queue[window_name].push(payload);
    sendMessage(window_name);
  } else if (command.action === 'close') {
    var target_window = command.data.target;
    this.close(target_window);
  }
};

WindowManagerServer.prototype.registerIPC = function() {
  ipc.on('WindowManager', function(event, arg) {
    this.handleChannelWindowManager(event, arg);
  }.bind(this));
}

module.exports = WindowManagerServer;
