import string from './string.js';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

//render((
//   <Router history={browserHistory}>
//    <Route path='/' component={App} />
//    <Route path='*' component={NoMatch} />
//   </Router>
//), document.getElementById('root'));

export default class App extends Component {
    render() {
        return (
            <div>App Component</div>
        );
    }
}