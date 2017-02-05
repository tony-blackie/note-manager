import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from '../components/AppComponent.jsx';
import NoMatch from '../components/NoMatchComponent.jsx';
import Note from '../components/NoteIcon.jsx';

$.ajax('/notes').then(function(response) {
    console.log(response);
});

let store = createStore();

ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={App} />
            <Route path="/note" component={Note} />
            <Route path='*' component={NoMatch} />
        </Router>
    </Provider>
), document.getElementById('root'));