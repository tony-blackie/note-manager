import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Styles from '../sass/index.scss';

import App from '../components/AppComponent.jsx';
import NoMatch from '../components/NoMatchComponent.jsx';
import EditNote from '../components/EditNote.jsx';

import {
  ADD_NEW_NOTE,
  MAKE_FOLDER_ACTIVE,
  GET_ALL_NOTES,
  EDIT_NOTE
} from '../actions/actionTypes.jsx';

let initialState = {
    folders: [
        {
            id: 0,
            children: [],
            isActive: false,
            isOpen: false
        },
        {
            id: 1,
            children: [],
            isActive: false,
            isOpen: false
        },
        {
            id: 2,
            children: [],
            isActive: false,
            isOpen: false
        }
    ],
    notes: [
        {
            id: 1,
            name: 'firstNote',
            text: 'This is a very nice text'
        }
    ],
    isNoteCreationMode: false
};

const reducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
    }

    switch(action.type) {
        case MAKE_FOLDER_ACTIVE:
            let newFoldersArray = state.folders.slice();

            newFoldersArray = newFoldersArray
                .slice(0, action.payload.index)
                .concat(
                    {
                        id: action.payload.index,
                        children: newFoldersArray.folder[action.payload.index].children,
                        isActive: !newFoldersArray.folder[action.payload.index].isActive,
                        isOpen: newFoldersArray.folder[action.payload.index].isOpen
                    }
                )
                .concat(newFoldersArray.slice(action.payload.index + 1));


            return (Object.assign({}, state,
                {
                    ...state,
                    folders: newFoldersArray
                }
            ));
        case ADD_NEW_NOTE:
            return {
                ...state,
                isNoteCreationMode: true
            };
        case GO_TO_NOTE:
            return {
                ...state,
                isNoteCreationMode: false
            }
        case GET_ALL_NOTES:
            return {
                ...state,
                notes: action.payload
            };
        default:
            return state;
    }
};

let store = createStore(reducer);

ReactDOM.render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path='/' component={App} />
            {/*<Route path='*' component={NoMatch} />*/}
            <Route path="/notes/:noteId" component={EditNote} />
            <Route path="/notes/new" component={EditNote} />
        </Router>
    </Provider>
), document.getElementById('root'));
