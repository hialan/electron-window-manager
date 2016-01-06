'use strict';
import React from "react";
import ReactDOM from "react-dom";

var WindowManagerClient = require('../../src/window_manager_client.js');

window.$ = window.jQuery = require('jquery');
var Bootstrap = require('bootstrap');

var MainWindow = React.createClass({
  componentDidMount: function() {
    this.windowManagerClient = new WindowManagerClient('secondWindow', function(event, arg){
      this.setState({message: arg});
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
  handleMessageChange: function(event) {
    this.setState({message: event.target.value});
  },
  handleSend: function() {
    this.windowManagerClient.send('mainWindow', this.state.message);
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
            <textarea className="form-control" value={this.state.message} onChange={this.handleMessageChange}></textarea>
          </div>
          <div className="col-xs-12 text-right">
            <button className="btn btn-default" onClick={this.handleSend}>Send message to 1st</button>
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
