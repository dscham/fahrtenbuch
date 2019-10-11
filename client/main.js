import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import Main from "./Main.tsx";

import './main.html';
import '../node_modules/material-components-web/dist/material-components-web.min.css';

Meteor.startup(() => {
  render(<Main/>, document.getElementById('app'));
});


