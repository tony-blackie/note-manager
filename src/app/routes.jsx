import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Styles from '../sass/index.scss';
import App from '../components/AppComponent.jsx';
import NoMatch from '../components/NoMatchComponent.jsx';
import EditNote from '../components/EditNote.jsx';
import EditFolder from '../components/EditFolder.jsx';
import reducer from './reducer.jsx';


let store = createStore(
  reducer,
  applyMiddleware(thunk)
);

ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={App} />
            {/*<Route path='*' component={NoMatch} />*/}
            <Route path="/notes/:noteId" component={EditNote} />
            <Route path="/note" component={EditNote} />
            <Route path="/edit-folder" component={EditFolder} />
        </Router>
    </Provider>
), document.getElementById('root'));
