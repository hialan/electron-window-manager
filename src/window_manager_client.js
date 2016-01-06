'use strict';
//var ipc = require('electron').ipcRenderer;
var ipc = require('ipc-renderer');

function WindowManagerClient(window_name, dispatcher) {
  this.window_name = window_name;
  this.dispatcher = dispatcher;
}

function sendToServer(action, data) {
  var command = {
    action: action,
    data: data
  };
  ipc.send('WindowManager', command);
}

WindowManagerClient.prototype.init = function() {
  ipc.on('WindowManager', function(event, arg) {
    this.dispatcher(event, arg);
  }.bind(this));

  // notify main process init done
  sendToServer('ready', {name: this.window_name});
}

WindowManagerClient.prototype.open = function(window_name, args) {
  sendToServer('open', {name: window_name, args: args});
}

WindowManagerClient.prototype.close = function(window_name = this.window_name) {
  sendToServer('close', {target: window_name});
}

WindowManagerClient.prototype.send = function(window_name, payload) {
  sendToServer('send', {target: window_name, payload: payload});
}

module.exports = WindowManagerClient;
