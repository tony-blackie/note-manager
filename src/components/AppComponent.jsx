import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import ControlPanel from './ControlPanel.jsx';
import FolderTree from './FolderTree.jsx';
import NotePanel from './NotePanel.jsx';
import Folder from './Folder.jsx';


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <ControlPanel />
                <FolderTree />
            </div>
        );
    }
}