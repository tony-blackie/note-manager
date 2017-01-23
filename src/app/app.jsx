import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router';
import App from '../components/AppComponent.jsx';
import NoMatch from '../components/NoMatchComponent.jsx';
import Note from '../components/NoteComponent.jsx';

$.ajax('/users').then(function(response) {
    debugger;
    console.log(response);
});

ReactDOM.render((
   <Router history={hashHistory}>
    <Route path='/' component={App} />
    <Route path='/note' component={Note} />
    <Route path='*' component={NoMatch} />
   </Router>
), document.getElementById('root'));