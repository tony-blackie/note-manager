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
    NoteType, 
    GoToNoteEditFn, 
    GoToNoteCreationFn,
    MakeFolderActiveFn,
    MakeFolderInactiveFn,
    TypedAction,
    FolderType,
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
    UpdateNoteFilterQueryFn
} from '../types';
import { hashHistory } from 'react-router';
import { baseName } from '../../../app/config';

export const handleSuccessfulGetAllNotes: HandleSuccessfulGetAllNotesFn = response => ({
    type: GET_ALL_NOTES_SUCCESS,
    payload: response
});

export const handleFailedGetAllNotes: HandleFailedGetAllNotesFn = error => ({
    type: GET_ALL_NOTES_FAIL,
    payload: error
});

export const requestAllNotes: RequestAllNotesFn = () => ({
    type: GET_ALL_NOTES
});

export const getAllNotes: GetAllNotesFn = () => dispatch => {
    dispatch(requestAllNotes());

    return fetch(`${baseName}/notes/`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => dispatch(handleSuccessfulGetAllNotes(json)))
    .catch(error => dispatch(handleFailedGetAllNotes(error)));
};

export const goToNoteEdit: GoToNoteEditFn = id => dispatch => {
    dispatch({type: GO_TO_NOTE_EDIT});

    hashHistory.push(`/notes/${id}/`);
};

export const goToNoteCreation: GoToNoteCreationFn = () => dispatch => {
    dispatch({ type: GO_TO_NOTE_CREATION });

    hashHistory.push(`/notes`);
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

    return fetch(`${baseName}/notes/${id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
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
    payload: folders
});

export const handleFailedGetAllFolders: HandleFailedGetAllFoldersFn = error => ({
    type: REQUEST_ALL_FOLDERS_FAIL,
    payload: { error }
});

export const getAllFolders: GetAllFoldersFn = () => dispatch => {
    dispatch({type: REQUEST_ALL_FOLDERS})

    return fetch(`${baseName}/folders`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => dispatch(handleSuccessfulGetAllFolders(json)))
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
    return fetch(`${baseName}/folders/${id}`, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(() => dispatch(handleSuccessfulDeleteFolder(id)))
    .catch(error => dispatch(handleFailedDeleteFolder(error)));
}

export const goToEditFolder: GoToEditFolderFn = id => dispatch => {
    dispatch({type: GO_TO_EDIT_FOLDER});

    hashHistory.push(`/folder/${id}`);
};

export const goToFolderCreation: GoToFolderCreationFn = () => dispatch => {
    dispatch({ type: GO_TO_FOLDER_CREATION });

    hashHistory.push('/folder');
};

export const updateNoteFilterQuery: UpdateNoteFilterQueryFn = query => dispatch => {
    dispatch({ type: UPDATE_NOTE_FILTER_QUERY, payload: { query } });
};
