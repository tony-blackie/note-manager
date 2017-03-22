import {
    RENAME_FOLDER,
    GET_FOLDER,
    GET_FOLDER_SUCCESS,
    GET_FOLDER_FAIL
} from '../actions/EditFolder.actions.jsx';

export const getFolder = id => dispatch => {
    $.ajax(`/folders/${id}`, {
        type: 'GET'
    }).then(folder => dispatch({ type: GET_FOLDER_SUCCESS, folder }))
    .catch(error => dispatch({ type: GET_FOLDER_FAIL, error }))
}
