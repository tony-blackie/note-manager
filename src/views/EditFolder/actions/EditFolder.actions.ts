import { hashHistory } from 'react-router';
import axios from 'axios';

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
import {
    EditFolderFn,
    HandleSuccessfulFolderEditFn,
    RequestFolderCreationFn,
    HandleSuccessfulFolderCreationFn,
    HandleFailedFolderCreationFn,
    HandleSuccessfulGetFolderFn,
    HandleFailedGetFolderFn,
    RequestFolderFn,
    GetFolderFn,
    HandleFolderNameChangeFn,
    HandleFailedFolderEditFn,
    RequestFolderEditFn,
    CreateNewFolderFn
} from '../types';
import { baseName } from '../../../app/config';

export const requestFolderCreation: RequestFolderCreationFn = () => ({
    type: REQUEST_FOLDER_CREATION
});

export const handleSuccessfulFolderCreation: HandleSuccessfulFolderCreationFn = folder => ({
    type: FOLDER_CREATION_SUCCESS, payload: { folder }
});

export const handleFailedFolderCreation: HandleFailedFolderCreationFn = error => ({
    type: FOLDER_CREATION_FAIL, payload: { error }
});

export const handleSuccessfulGetFolder: HandleSuccessfulGetFolderFn = folder => {
    return {
        type: GET_FOLDER_SUCCESS,
        payload: { folder }
    };
};

export const handleFailedGetFolder: HandleFailedGetFolderFn = error => ({
    type: GET_FOLDER_FAIL, payload: { error }
});

export const requestFolder: RequestFolderFn = () => ({
    type: GET_FOLDER
});

export const getFolder: GetFolderFn = id => dispatch => {
    dispatch(requestFolder());

    // fetch(`${baseName}/folder/${id}/`, {
    //     method: 'GET',
    //     credentials: 'same-origin',
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer A088hWN1ZTTTjbkb9PaVIiq4wfY2jP'
    //     }
    // })
    // .then(response => response.json())

    return axios.request({
        url: `${baseName}/folder/${id}/`,
        method: 'GET'
    })
    .then(response => dispatch(handleSuccessfulGetFolder(response.data)))
    .catch(error => dispatch(handleFailedGetFolder(error)));
}

export const handleFolderNameChange: HandleFolderNameChangeFn = text => ({
    type: CHANGE_FOLDER_NAME,
    payload: { text }
});

export const handleSuccessfulFolderEdit: HandleSuccessfulFolderEditFn = (folderId, folderName) => ({
    type: SAVE_EDITED_FOLDER,
    payload: { folderId, folderName }
});

export const handleFailedFolderEdit: HandleFailedFolderEditFn = error => ({
    type: HANDLE_FOLDER_EDIT_ERROR,
    payload: { error }
});

export const requestFolderEdit: RequestFolderEditFn = () => ({
    type: REQUEST_FOLDER_EDIT
});

export const editFolder: EditFolderFn = (id, name) => dispatch => {
    dispatch(requestFolderEdit());

    // return fetch(`${baseName}/folder/${id}/`, {
    //     method: 'PUT',
    //     credentials: 'same-origin',
    //     body: JSON.stringify({ id, name }),
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer A088hWN1ZTTTjbkb9PaVIiq4wfY2jP'
    //     }
    // })
    // .then(response => response.json())
    return axios.request({
        url:`${baseName}/folder/${id}/`,
        method: 'PUT',
        data: { id, name }
    })
    .then(response => {
        const { data } = response;

        dispatch(handleSuccessfulFolderEdit(data.id, data.name));

        hashHistory.push('/');
    })
    .catch(error => {
        dispatch(handleFailedFolderEdit(error));

        hashHistory.push('/');
    });
}

export const createNewFolder: CreateNewFolderFn = folderName => dispatch => {
    dispatch(requestFolderCreation());

    // return fetch(`${baseName}/folder`, {
    //     method: 'PUT',
    //     credentials: 'same-origin',
    //     body: JSON.stringify({ name: folderName }),
    //     headers: {
    //         'Accept': 'application/json',
    //         'Content-Type': 'application/json',
    //         'Authorization': 'Bearer A088hWN1ZTTTjbkb9PaVIiq4wfY2jP'
    //     }
    // })

    return axios.request({
        url:`${baseName}/folder`,
        method: 'PUT',
        data: { name: folderName }
    })
    .then(response => {
        dispatch(handleSuccessfulFolderCreation(folderName));

        hashHistory.push('/');
    })
    .catch(error => {
        dispatch(handleFailedFolderCreation('sorry'));
        
        //hashHistory.push('/');
    });
}
