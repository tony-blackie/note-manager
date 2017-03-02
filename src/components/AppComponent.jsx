import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import ControlPanel from './ControlPanel.jsx';
import FolderTree from './FolderTree.jsx';
import NotePanel from './NotePanel.jsx';
import Folder from './Folder.jsx';
import { createStore } from 'redux';
import { connect } from 'react-redux';
import { MAKE_FOLDER_ACTIVE } from '../actions/actionTypes.jsx';

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
    note: {
        name: 'someName',
        text: 'someText'
    }
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
    }

    return state;
};

let store = createStore(reducer);


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <ControlPanel />
                <FolderTree />
                <NotePanel />
            </div>
        );
    }
}

const mapStateToProps = () => {

};

const mapDispatchToProps = () => {

};

//TODO: Check if it needs to be exported
const connection = connect(mapStateToProps, mapDispatchToProps)(App);
