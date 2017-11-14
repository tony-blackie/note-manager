import { hashHistory } from 'react-router';
import axios from 'axios';

import {
    GET_ALL_NOTES,
    GET_ALL_NOTES_SUCCESS,
    GET_ALL_NOTES_FAIL,
    GO_TO_NOTE_CREATION,
    GO_TO_NOTE_EDIT,
    GO_TO_EDIT_FOLDER,
    REMOVE_NOTE,
    REMOVE_NOTE_SUCCESS,
    REMOVE_NOTE_FAIL,
    MAKE_FOLDER_ACTIVE,
    MAKE_FOLDER_INACTIVE,
    REQUEST_ALL_FOLDERS,
    REQUEST_ALL_FOLDERS_SUCCESS,
    REQUEST_ALL_FOLDERS_FAIL,
    REMOVE_FOLDER_SUCCESS,
    REMOVE_FOLDER_FAIL,
    GO_TO_FOLDER_CREATION,
    UPDATE_NOTE_FILTER_QUERY
} from '../../actionTypes';
import {
    GoToNoteEditFn,
    GoToNoteCreationFn,
    MakeFolderActiveFn,
    MakeFolderInactiveFn,
    GetAllFoldersFn,
    RemoveFolderFn,
    GoToEditFolderFn,
    GoToFolderCreationFn,
    HandleSuccessfulGetAllNotesFn,
    HandleFailedGetAllNotesFn,
    RequestAllNotesFn,
    GetAllNotesFn,
    HandleSuccessfulDeleteFolderFn,
    HandleSuccessfulDeleteNoteFn,
    HandleFailedDeleteNoteFn,
    RemoveNoteFn,
    HandleSuccessfulGetAllFoldersFn,
    HandleFailedGetAllFoldersFn,
    HandleFailedDeleteFolderFn,
    UpdateNoteFilterQueryFn,
    CreateInitialFolderFn
} from '../types';
import { FolderType, NoteType, TypedAction } from '../../../generic/types';
import { baseName } from '../../../app/config';

export const handleSuccessfulGetAllNotes: HandleSuccessfulGetAllNotesFn = notes => ({
    type: GET_ALL_NOTES_SUCCESS,
    payload: { notes }
});

export const handleFailedGetAllNotes: HandleFailedGetAllNotesFn = error => ({
    type: GET_ALL_NOTES_FAIL,
    payload: { error }
});

export const requestAllNotes: RequestAllNotesFn = () => ({
    type: GET_ALL_NOTES
});

export const getAllNotes: GetAllNotesFn = () => dispatch => {
    dispatch(requestAllNotes());

    return axios.get(`${baseName}/note/`)
    .then(response => dispatch(handleSuccessfulGetAllNotes(response.data)))
    .catch(error => dispatch(handleFailedGetAllNotes(error)));
};

export const goToNoteEdit: GoToNoteEditFn = id => dispatch => {
    dispatch({type: GO_TO_NOTE_EDIT});

    hashHistory.push(`/note/${id}/`);
};

export const goToNoteCreation: GoToNoteCreationFn = () => dispatch => {
    dispatch({ type: GO_TO_NOTE_CREATION });

    hashHistory.push(`/note`);
}

export const handleSuccessfulDeleteNote: HandleSuccessfulDeleteNoteFn = id => ({
    type: REMOVE_NOTE_SUCCESS,
    payload: { id }
});

export const handleFailedDeleteNote: HandleFailedDeleteNoteFn = error => ({
    type: REMOVE_NOTE_FAIL,
    payload: { error }
});

export const removeNote: RemoveNoteFn = id => dispatch => {
    dispatch({ type: REMOVE_NOTE });

    return axios.delete(`${baseName}/note/${id}`)
    .then(() => dispatch(handleSuccessfulDeleteNote(id)))
    .catch(error => dispatch(handleFailedDeleteNote(error)));
}

export const makeFolderActive: MakeFolderActiveFn = id => dispatch => {
    dispatch({ type: MAKE_FOLDER_ACTIVE, payload: { id } });
}

export const makeFolderInactive: MakeFolderInactiveFn = id => dispatch => {
    dispatch({ type: MAKE_FOLDER_INACTIVE, payload: { id } });
}

export const handleSuccessfulGetAllFolders: HandleSuccessfulGetAllFoldersFn = folders => ({
    type: REQUEST_ALL_FOLDERS_SUCCESS,
    payload: { folders }
});

export const handleFailedGetAllFolders: HandleFailedGetAllFoldersFn = error => ({
    type: REQUEST_ALL_FOLDERS_FAIL,
    payload: { error }
});

export const getAllFolders: GetAllFoldersFn = () => dispatch => {
    dispatch({type: REQUEST_ALL_FOLDERS})

    return axios.get(`${baseName}/folder`)
    .then(response => dispatch(handleSuccessfulGetAllFolders(response.data)))
    .catch(error => dispatch(handleFailedGetAllFolders(error)));
}

export const handleSuccessfulDeleteFolder: HandleSuccessfulDeleteFolderFn = id => ({
    type: REMOVE_FOLDER_SUCCESS,
    payload: { id }
});

export const handleFailedDeleteFolder: HandleFailedDeleteFolderFn = error => ({
    type: REMOVE_FOLDER_FAIL,
    payload: { error }
});

export const removeFolder: RemoveFolderFn = id => dispatch => {

    return axios.delete(`${baseName}/folder/${id}`)
    .then(() => dispatch(handleSuccessfulDeleteFolder(id)))
    .catch(error => dispatch(handleFailedDeleteFolder(error)));
}

export const goToEditFolder: GoToEditFolderFn = id => dispatch => {
    dispatch({type: GO_TO_EDIT_FOLDER});

    hashHistory.push(`/folder/${id}`);
};

export const goToFolderCreation: GoToFolderCreationFn = () => dispatch => {
    dispatch({ type: GO_TO_FOLDER_CREATION });

    hashHistory.push('/folder/');
};

export const updateNoteFilterQuery: UpdateNoteFilterQueryFn = query =>
    ({ type: UPDATE_NOTE_FILTER_QUERY, payload: { query } });

export const createInitialFolder: CreateInitialFolderFn = () => {
    const folder = {
        name: 'Initial',
        is_root: true,
        parent: 0,
        notes: []
    };

    return axios.request({
        url: `${baseName}/folder/`,
        method: 'POST',
        data: folder
    })
    .then(response => console.log(response))
    .catch(error => console.log(error));
};