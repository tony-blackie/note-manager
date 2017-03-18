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
  goToNoteEdit,
  removeNote,
  makeFolderActive,
  getAllFolders
} from '../actions/AppComponent.actions.jsx';

export class App extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getAllNotes();
        this.props.getAllFolders();
    }

    render() {
        return (
            <div>
                <ControlPanel goToNoteCreation={this.props.goToNoteCreation} />
                <div className="content">
                    <FolderTree
                      folders={this.props.folders}
                      makeFolderActive={this.props.makeFolderActive}
                    />
                    <NotePanel
                        notes={this.props.notes}
                        goToNoteEdit={this.props.goToNoteEdit}
                        removeNote={this.props.removeNote}
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        folders: state.folders
    }
};

const mapDispatchToProps = dispatch => bindActionCreators({
    addNote,
    getAllNotes,
    goToNoteCreation,
    goToNoteEdit,
    removeNote,
    makeFolderActive,
    getAllFolders
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
