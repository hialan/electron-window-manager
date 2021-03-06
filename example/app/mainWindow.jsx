'use strict';
import React from "react";
import ReactDOM from "react-dom";

var WindowManagerClient = require('../../src/window_manager_client.js');

window.$ = window.jQuery = require('jquery');
var Bootstrap = require('bootstrap');

var MainWindow = React.createClass({
  componentDidMount: function() {
    this.windowManagerClient = new WindowManagerClient('mainWindow', function(event, arg){
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
  handleOpen2ndWin: function() {
    this.windowManagerClient.open('secondWindow', 'I am your father!');
  },
  handleClose2ndWin: function() {
    this.windowManagerClient.close('secondWindow');
  },
  handleMessageChange: function(event) {
    this.setState({message: event.target.value});
  },
  handleSend: function() {
    this.windowManagerClient.send('secondWindow', this.state.message);
  },
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xs-12">
            <button className="btn btn-default" onClick={this.handleButtonClick}>Test</button>
            <button className="btn btn-default" onClick={this.handleCloseWindow}>Close this window</button>
            <br/>
            <button className="btn btn-default" onClick={this.handleOpen2ndWin}>Open 2nd window</button>
            <button className="btn btn-default" onClick={this.handleClose2ndWin}>Close 2nd window</button>
          </div>
          <div className="col-xs-12">
            <textarea className="form-control" value={this.state.message} onChange={this.handleMessageChange}></textarea>
          </div>
          <div className="col-xs-12 text-right">
            <button className="btn btn-default" onClick={this.handleSend}>Send message to 2nd</button>
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
