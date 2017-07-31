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
    GO_TO_FOLDER_CREATION
} from '../../actionTypes.jsx';
import { hashHistory } from 'react-router';

export const handleSuccessfulGetAllNotes = response => ({
    type: GET_ALL_NOTES_SUCCESS,
    payload: response
});

export const handleFailedGetAllNotes = error => ({
    type: GET_ALL_NOTES_FAIL,
    payload: error
});

export const requestAllNotes = () => ({
    type: GET_ALL_NOTES
});

export const getAllNotes = () => dispatch => {
    dispatch(requestAllNotes());

    return fetch(`http://localhost:8000/notes/`, {
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

export const goToNoteEdit = id => dispatch => {
    dispatch({type: GO_TO_NOTE_EDIT});

    hashHistory.push(`/notes/${id}`);
};

export const goToNoteCreation = () => dispatch => {
    dispatch({ type: GO_TO_NOTE_CREATION });

    hashHistory.push(`/notes`);
}

export const handleSuccessfulDeleteNote = id => ({
    type: REMOVE_NOTE_SUCCESS,
    payload: id
});

export const handleFailedDeleteNote = error => ({
    type: REMOVE_NOTE_FAIL,
    error
});

export const removeNote = id => dispatch => {
    dispatch({ type: REMOVE_NOTE });

    return fetch(`/notes/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(() => dispatch(handleSuccessfulDeleteNote(id)))
    .catch(error => dispatch(handleFailedDeleteNote(error)));
}

export const makeFolderActive = id => dispatch => {
    dispatch({ type: MAKE_FOLDER_ACTIVE, id });
}

export const makeFolderInactive = id => dispatch => {
    dispatch({ type: MAKE_FOLDER_INACTIVE, id });
}

export const handleSuccessfulGetAllFolders = folders => ({
    type: REQUEST_ALL_FOLDERS_SUCCESS,
    payload: folders
});

export const handleFailedGetAllFolders = error => ({
    type: REQUEST_ALL_FOLDERS_FAIL,
    error
});

export const getAllFolders = () => dispatch => {
    dispatch({type: REQUEST_ALL_FOLDERS})

    return fetch(`http://localhost:8000/folders`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(json => dispatch(handleSuccessfulGetAllFolders(json)))
    .catch(error => dispatch(handleFailedGetAllFolders(error)));
}

export const handleSuccessfulDeleteFolder = id => ({
    type: REMOVE_FOLDER_SUCCESS,
    id
});

export const handleFailedDeleteFolder = error => ({
    type: REMOVE_FOLDER_FAIL,
    error
});

export const removeFolder = id => dispatch => {
    return fetch(`http://localhost:8000/folders/${id}`, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(() => dispatch(handleSuccessfulDeleteFolder(id)))
    .catch(error => dispatch(handleFailedDeleteFolder(error)));
}

export const goToEditFolder = id => dispatch => {
    dispatch({type: GO_TO_EDIT_FOLDER});

    hashHistory.push(`/folder/${id}`);
};

export const goToFolderCreation = () => dispatch => {
    dispatch({ type: GO_TO_FOLDER_CREATION });

    hashHistory.push('/folder');
}
