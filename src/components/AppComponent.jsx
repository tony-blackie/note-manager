import React, { Component } from 'react';

import ControlPanel from './ControlPanel.jsx';
import FolderTree from './FolderTree.jsx';
import NotePanel from './NotePanel.jsx';
import Folder from './Folder.jsx';

import { connect } from 'react-redux';

import {
  addNote,
  getAllNotes
} from '../actions/AppComponent.actions.jsx';

export class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ControlPanel addNote={this.props.addNote} />
                <FolderTree />
                <NotePanel notes={this.props.notes}  />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes
    }
};

const mapDispatchToProps = dispatch => ({
    addNote: () => dispatch(addNote()),
    getAllNotes: getAllNotes().then(response => {
        dispatch(response);
      })
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
