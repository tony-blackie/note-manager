import {
    RENAME_FOLDER,
    GET_FOLDER,
    GET_FOLDER_SUCCESS,
    GET_FOLDER_FAIL,
    CHANGE_FOLDER_NAME,
    SAVE_EDITED_FOLDER,
    HANDLE_FOLDER_EDIT_ERROR
} from '../actions/EditFolder.actions.jsx';

export const getFolder = id => dispatch => {
    return $.ajax(`/folders/${id}`, {
        type: 'GET'
    }).then(folder => {
      dispatch({ type: GET_FOLDER_SUCCESS, folder })
    });
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
    })
    .catch(error => {
        dispatch( { type: HANDLE_FOLDER_EDIT_ERROR, error } )
    });

}
