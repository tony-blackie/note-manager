import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from '../components/app.js';
import NoMatch from '../components/noMatch.js';

render((
   <Router history={browserHistory}>
    <Route path='/' component={App} />
    <Route path='*' component={NoMatch} />
   </Router>
), document.getElementById('root'));