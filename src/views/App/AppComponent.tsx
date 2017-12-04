import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import axios from 'axios';
import { hashHistory } from 'react-router';
import { Paper, AppBar } from 'material-ui';
import { grey300, TextField } from 'material-ui';

import ControlPanel from './components/ControlPanel';
import FolderTree from './components/FolderTree';
import NotePanel from './components/NotePanel';
import Folder from './components/Folder';
import { selectNotesByQuery, selectFolders, selectActiveFolderId, selectQuery } from './selectors';
import utils from '../../utils';
import { updateNoteFilterQuery } from './actions/AppComponent.actions';

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
    CreateInitialFolderFn,
    UpdateNoteFilterQueryFn
} from './types';
import { FolderType, NoteType } from '../../generic/types';

interface MappedProps {
    filteredNotes: NoteType[];
    folders: FolderType[];
    activeFolderId: number;
    searchQuery: string;
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
    updateNoteFilterQuery: UpdateNoteFilterQueryFn;
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

    updateNoteFilterQuery = (event) => {
        const text = event.target.value;

        this.props.updateNoteFilterQuery(text);
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

        const wrapperStyles = {
            padding: 20,
            margin: '20px auto',
            maxWidth: 300
        };

        const menuStyles = {
            width: '100%',
            backgroundColor: grey300
        };

        return (
            <div>
                <AppBar
                    title="Notes"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    zDepth={2}
                >
                    <TextField
                        value={this.props.searchQuery}
                        onChange={this.updateNoteFilterQuery}
                        className="note-search"
                    />
                    <ControlPanel
                        goToNoteCreation={goToNoteCreation}
                        removeFolder={removeFolder}
                        activeFolderId={activeFolderId}
                        goToEditFolder={goToEditFolder}
                        goToFolderCreation={goToFolderCreation}
                    />
                </AppBar>
                <div className="content-wrapper">
                    <Paper zDepth={2} style={wrapperStyles}>
                        <FolderTree
                        folders={currentFolders}
                        makeFolderActive={makeFolderActive}
                        makeFolderInactive={makeFolderInactive}
                        />
                    </Paper>
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
    activeFolderId: selectActiveFolderId,
    searchQuery: selectQuery
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
    createInitialFolder,
    updateNoteFilterQuery
}, dispatch);

export default connect<MappedProps, MappedActions, {}>(mapStateToProps, mapDispatchToProps)(App);
