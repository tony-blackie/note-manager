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
  goToFolderCreation,
  updateNoteFilterQuery
} from './actions/AppComponent.actions';

import {
    GetAllNotesFn,
    GetAllFoldersFn,
    GoToNoteEditFn,
    GoToEditFolderFn,
    MakeFolderActiveFn,
    MakeFolderInactiveFn,
    GoToNoteCreationFn,
    GoToFolderCreationFn,
    RemoveFolderFn,
    RemoveNoteFn
} from './types';
import { FolderType, NoteType } from '../../generic/types';

interface MappedProps {
    notes: NoteType[];
    filteredNotes: NoteType[];
    folders: FolderType[];
    activeFolderId: number;
}

interface MappedActions {
    getAllNotes: GetAllNotesFn;
    getAllFolders: GetAllFoldersFn;
    goToNoteEdit: GoToNoteEditFn;
    goToEditFolder: GoToEditFolderFn;
    makeFolderActive: MakeFolderActiveFn;
    makeFolderInactive: MakeFolderInactiveFn;
    goToNoteCreation: GoToNoteCreationFn;
    goToFolderCreation: GoToFolderCreationFn;
    removeFolder: RemoveFolderFn;
    removeNote: RemoveNoteFn;
}

type Props = MappedProps & MappedActions;

export class App extends React.Component<Props> {
    componentDidMount() {
        this.props.getAllNotes();
        this.props.getAllFolders();
    }

    render() {
        const {
            goToNoteCreation,
            removeFolder,
            activeFolderId,
            goToEditFolder,
            goToFolderCreation,
            folders,
            makeFolderActive,
            makeFolderInactive,
            notes,
            goToNoteEdit,
            removeNote
        } = this.props;

        return (
            <div>
                <ControlPanel
                    goToNoteCreation={goToNoteCreation}
                    removeFolder={removeFolder}
                    activeFolderId={activeFolderId}
                    goToEditFolder={goToEditFolder}
                    goToFolderCreation={goToFolderCreation}
                />
                <div className="content">
                    <FolderTree
                      folders={folders}
                      makeFolderActive={makeFolderActive}
                      makeFolderInactive={makeFolderInactive}
                    />
                    <NotePanel
                        notes={notes}
                        goToNoteEdit={goToNoteEdit}
                        removeNote={removeNote}
                        activeFolderId={activeFolderId}
                        updateNoteFilterQuery={updateNoteFilterQuery}
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => ({
    notes: state.app.notes,
    filteredNotes: filterNotes(state),
    folders: state.app.folders,
    activeFolderId: state.app.activeFolderId
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
    goToFolderCreation,
    updateNoteFilterQuery
}, dispatch);

export default connect<MappedProps, MappedActions, {}>(mapStateToProps, mapDispatchToProps)(App);
