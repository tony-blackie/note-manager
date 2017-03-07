import React, { Component } from 'react';

import ControlPanel from './ControlPanel.jsx';
import FolderTree from './FolderTree.jsx';
import NotePanel from './NotePanel.jsx';
import Folder from './Folder.jsx';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { hashHistory } from 'react-router';

import {
  addNote,
  getAllNotes,
  goToNoteCreation,
  goToNoteEdit
} from '../actions/AppComponent.actions.jsx';

export class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ControlPanel goToNoteCreation={this.props.goToNoteCreation} />
                <FolderTree />
                <NotePanel notes={this.props.notes} goToNoteEdit={this.props.goToNoteEdit}  />
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    addNote: addNote,
    getAllNotes: getAllNotes,
    goToNoteCreation: goToNoteCreation,
    goToNoteEdit: goToNoteEdit
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
