import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import { Link } from 'react-router';
import ControlPanel from './ControlPanel.jsx';
import FolderTree from './FolderTree.jsx';
import NotePanel from './NotePanel.jsx';


export default class App extends Component {
    render() {
        return (
            <div>
                <Link to="/note">Note</Link>
                <ControlPanel />
                <FolderTree />
                <NotePanel />
            </div>
        );
    }
}