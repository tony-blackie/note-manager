import * as React from 'react';

import ControlPanel from './components/ControlPanel';
import FolderTree from './components/FolderTree';
import NotePanel from './components/NotePanel';
import Folder from './components/Folder';
import { default as filterNotes } from './queries/filterNotes';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getAllNotes,
  goToNoteCreation,
  goToNoteEdit,
  removeNote,
  makeFolderActive,
  makeFolderInactive,
  getAllFolders,
  removeFolder,
  goToEditFolder,
  goToFolderCreation
} from './actions/AppComponent.actions';

export class App extends React.Component {
    componentDidMount() {
        this.props.getAllNotes();
        this.props.getAllFolders();
    }

    render() {
        return (
            <div>
                <ControlPanel
                    goToNoteCreation={this.props.goToNoteCreation}
                    removeFolder={this.props.removeFolder}
                    activeFolderId={this.props.activeFolderId}
                    goToEditFolder={this.props.goToEditFolder}
                    goToFolderCreation={this.props.goToFolderCreation}
                />
                <div className="content">
                    <FolderTree
                      folders={this.props.folders}
                      makeFolderActive={this.props.makeFolderActive}
                      makeFolderInactive={this.props.makeFolderInactive}
                    />
                    <NotePanel
                        notes={this.props.notes}
                        goToNoteEdit={this.props.goToNoteEdit}
                        removeNote={this.props.removeNote}
                        activeFolderId={this.props.activeFolderId}
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => ({
    notes: state.notes,
    filteredNotes: filterNotes(state),
    folders: state.folders,
    activeFolderId: state.activeFolderId
});

export const mapDispatchToProps = dispatch => bindActionCreators({
    getAllNotes,
    goToNoteCreation,
    goToNoteEdit,
    removeNote,
    makeFolderActive,
    makeFolderInactive,
    getAllFolders,
    removeFolder,
    goToEditFolder,
    goToFolderCreation
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
