import {
    RENAME_FOLDER,
    GET_FOLDER,
    GET_FOLDER_SUCCESS,
    GET_FOLDER_FAIL,
    CHANGE_FOLDER_NAME,
    SAVE_EDITED_FOLDER,
    HANDLE_FOLDER_EDIT_ERROR,
    REQUEST_FOLDER_CREATION,
    REQUEST_FOLDER_EDIT,
    FOLDER_CREATION_SUCCESS,
    FOLDER_CREATION_FAIL
} from '../../actionTypes';
import { EditFolderFn, HandleSuccessfulFolderEditFn } from '../types';
import { hashHistory } from 'react-router';
import { baseName } from '../../../app/config';

export const requestFolderCreation = () => ({
    type: REQUEST_FOLDER_CREATION
});

export const handleSuccessfulFolderCreation = folder => ({
    type: FOLDER_CREATION_SUCCESS, folder
});

export const handleFailedFolderCreation = error => ({
    type: FOLDER_CREATION_FAIL, error
});

export const handleSuccessfulGetFolder = folder => {
    return {
        type: GET_FOLDER_SUCCESS,
        payload: { folder }
    };
};

export const handleFailedGetFolder = error => ({
    type: GET_FOLDER_FAIL, error
});

export const requestFolder = () => ({
    type: GET_FOLDER
});

export const getFolder = id => dispatch => {
    dispatch(requestFolder());

    fetch(`${baseName}/folder/${id}/`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => dispatch(handleSuccessfulGetFolder(response)))
    .catch(error => dispatch(handleFailedGetFolder(error)));
}

export const handleFolderNameChange = text => dispatch => {
    dispatch({ type: CHANGE_FOLDER_NAME, text });
}

export const handleSuccessfulFolderEdit: HandleSuccessfulFolderEditFn = (folderId, folderName) => ({
    type: SAVE_EDITED_FOLDER,
    payload: { folderId, folderName }
});

export const handleFailedFolderEdit = error => ({
    type: HANDLE_FOLDER_EDIT_ERROR,
    error
});

export const requestFolderEdit = () => ({
    type: REQUEST_FOLDER_EDIT
});

export const editFolder: EditFolderFn = (id, name) => dispatch => {
    dispatch(requestFolderEdit());

    return fetch(`${baseName}/folder/${id}/`, {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify({ id, name }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => {
        dispatch(handleSuccessfulFolderEdit(response.id, response.name));

        hashHistory.push('/');
    })
    .catch(error => {
        dispatch(handleFailedFolderEdit(error));

        hashHistory.push('/');
    });
}

export const createNewFolder = folderName => dispatch => {
    dispatch(requestFolderCreation());

    return fetch(`${baseName}/folder`, {
        method: 'PUT',
        credentials: 'same-origin',
        body: JSON.stringify({ name: folderName }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        dispatch(handleSuccessfulFolderCreation(folderName));

        hashHistory.push('/');
    })
    .catch(error => {
        dispatch(handleFailedFolderCreation(error));

        hashHistory.push('/');
    });
}
