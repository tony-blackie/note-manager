import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router as Router, Route, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import '../sass/index.scss';
import App from '../views/App/AppComponent';
import NoMatch from '../views/NoMatchComponent/NoMatchComponent';
import EditNote from '../views/EditNote/EditNote';
import EditFolder from '../views/EditFolder/EditFolder';
import rootReducer from './reducer';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={App} />
            <Route path="/note/:noteId" component={EditNote} />
            <Route path="/note" component={EditNote} />
            <Route path="/folder/:id" component={EditFolder} />
            <Route path="/folder" component={EditFolder} />
        </Router>
    </Provider>
), document.getElementById('root'));
