'use strict';
import React from "react";
import ReactDOM from "react-dom";

var WindowManagerClient = require('../../src/window_manager_client.js');

window.$ = window.jQuery = require('jquery');
var Bootstrap = require('bootstrap');

var MainWindow = React.createClass({
  componentDidMount: function() {
    this.windowManagerClient = new WindowManagerClient('mainWindow', function(event, arg){
      var mode = arg.mode;
      var data = arg.data;
      this.setState({mode: mode, data: data});
    }.bind(this));

    this.windowManagerClient.init();
  },
  getInitialState: function() {
      return {
          message: '',
      };
  },
  handleButtonClick: function() {
    var msg = this.state.message;
    msg += "Test ";
    this.setState({message: msg});
  },
  handleCloseWindow: function() {
    this.windowManagerClient.close();
  },
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-default" onClick={this.handleButtonClick}>Test</button>
            <button className="btn btn-default" onClick={this.handleCloseWindow}>Close</button>
          </div>
          <div className="col-xs-12">
            <textarea className="form-control" value={this.state.message}></textarea>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <MainWindow/>,
  document.getElementById('content')
);
