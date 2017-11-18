import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import { hashHistory } from 'react-router';

import ControlPanel from './components/ControlPanel';
import FolderTree from './components/FolderTree';
import NotePanel from './components/NotePanel';
import Folder from './components/Folder';
import { selectNotesByQuery, selectFolders, selectActiveFolderId } from './selectors';
import utils from '../../utils';

const { setDefaultAuthHeader, getToken } = utils;

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
  createInitialFolder
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
    RemoveNoteFn,
    CreateInitialFolderFn
} from './types';
import { FolderType, NoteType } from '../../generic/types';

interface MappedProps {
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
    createInitialFolder: CreateInitialFolderFn;
}

type Props = MappedProps & MappedActions;

export class App extends React.Component<Props> {
    componentDidMount() {
        if (!getToken()) {
            hashHistory.push('/login');
        }

        setDefaultAuthHeader();

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
            goToNoteEdit,
            removeNote,
            filteredNotes
        } = this.props;

        let currentFolders = [];

        if (folders !== null && folders.length === 0) {
            this.props.createInitialFolder();
        }

        if (folders !== null) {
            currentFolders = folders;
        }

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
                      folders={currentFolders}
                      makeFolderActive={makeFolderActive}
                      makeFolderInactive={makeFolderInactive}
                    />
                    <NotePanel
                        notes={filteredNotes}
                        goToNoteEdit={goToNoteEdit}
                        removeNote={removeNote}
                        activeFolderId={activeFolderId}
                        folders={currentFolders}
                    />
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => createStructuredSelector({
    filteredNotes: selectNotesByQuery,
    folders: selectFolders,
    activeFolderId: selectActiveFolderId
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
    createInitialFolder
}, dispatch);

export default connect<MappedProps, MappedActions, {}>(mapStateToProps, mapDispatchToProps)(App);
