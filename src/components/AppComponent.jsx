import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import ControlPanel from './ControlPanel.jsx';
import FolderTree from './FolderTree.jsx';
import NotePanel from './NotePanel.jsx';
import Folder from './Folder.jsx';
import { createStore } from 'redux';

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
    ]
};

const reducer = (state, action) => {
    if (typeof state === 'undefined') {
        return initialState;
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