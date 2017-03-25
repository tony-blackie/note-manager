import {
    RENAME_FOLDER,
    GET_FOLDER,
    GET_FOLDER_SUCCESS,
    GET_FOLDER_FAIL,
    CHANGE_FOLDER_NAME,
    SAVE_EDITED_FOLDER,
    HANDLE_FOLDER_EDIT_ERROR
} from './actionTypes.jsx';
import { hashHistory } from 'react-router';

export const handleSuccessfulGetFolder = folder => {
    return {type: GET_FOLDER_SUCCESS, folder};
};

export const handleFailedGetFolder = error => ({
    type: GET_FOLDER_FAIL, error
});

export const getFolder = id => dispatch => {
    $.ajax(`/folders/${id}`, {
        type: 'GET'
    })
    .then(folder => dispatch(handleSuccessfulGetFolder(folder)))
    .catch(error => dispatch(handleFailedGetFolder(error)));
}

export const saveEditedFolder = id => dispatch => {

}

export const handleFolderNameChange = text => dispatch => {
    dispatch( { type: CHANGE_FOLDER_NAME, text } );
}

export const requestFolderEdit = folder => dispatch => {
    return $.ajax(`/folders/${folder.id}`, {
      data: JSON.stringify(folder),
      contentType: 'application/json',
      type: 'PUT'
    })
    .then(response => {
        dispatch( { type: SAVE_EDITED_FOLDER, folder } )

        hashHistory.push('/');
    })
    .catch(error => {
        dispatch( { type: HANDLE_FOLDER_EDIT_ERROR, error } )
    });

}
