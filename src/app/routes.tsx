import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router as Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import '../sass/index.scss';
import App from '../views/App/AppComponent';
import NoMatch from '../views/NoMatchComponent/NoMatchComponent';
import EditNote from '../views/EditNote/EditNote';
import EditFolder from '../views/EditFolder/EditFolder';
import reducer from './reducer';

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
            <Route path="/folder/:id" component={EditFolder} />
            <Route path="/folder" component={EditFolder} />
        </Router>
    </Provider>
), document.getElementById('root'));
