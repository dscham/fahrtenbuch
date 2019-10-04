import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './main.html';
import '../node_modules/material-components-web/dist/material-components-web.min.css';

Meteor.startup(() => {
  render(<App />, document.getElementById('app'));
});


