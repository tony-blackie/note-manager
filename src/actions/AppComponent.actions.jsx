import {
    GET_ALL_NOTES,
    GET_ALL_NOTES_SUCCESS,
    GO_TO_NOTE_CREATION,
    GO_TO_NOTE_EDIT,
    GO_TO_EDIT_FOLDER,
    REMOVE_NOTE,
    REMOVE_NOTE_SUCCESS,
    MAKE_FOLDER_ACTIVE,
    REQUEST_ALL_FOLDERS,
    REQUEST_ALL_FOLDERS_SUCCESS,
    REMOVE_FOLDER,
} from './actionTypes.jsx';

import { hashHistory } from 'react-router';

export const addNote = () => ({
    type: ADD_NEW_NOTE
});

export const getAllNotes = () => dispatch => {
    dispatch({type: GET_ALL_NOTES})

    return ($.get('/notes').then(response => {
        dispatch({
          type: GET_ALL_NOTES_SUCCESS,
          payload: response
        });
    }));
};

export const goToNoteEdit = id => dispatch => {
    dispatch({type: GO_TO_NOTE_EDIT});

    hashHistory.push(`/notes/${id}`);
};

export const goToNoteCreation = () => dispatch => {
    dispatch({ type: GO_TO_NOTE_CREATION });

    hashHistory.push(`/note`);
}

export const removeNote = id => dispatch => {
    dispatch({ type: REMOVE_NOTE });

    return($.ajax({
        url: `/notes/${id}`,
        type: 'DELETE'
    })).then(response => {
        dispatch({type: REMOVE_NOTE_SUCCESS, payload: id});
    })
}

export const makeFolderActive = id => dispatch => {
    dispatch({ type: MAKE_FOLDER_ACTIVE, id });
}

export const getAllFolders = () => dispatch => {
    dispatch({type: REQUEST_ALL_FOLDERS})

    return ($.get('/folders').then(response => {
        dispatch({
          type: REQUEST_ALL_FOLDERS_SUCCESS,
          payload: response
        });
    }));
}

export const removeFolder = id => dispatch => {
    return($.ajax({
        url: `/folders/${id}`,
        type: 'DELETE'
    })).then(response => {
        dispatch({ type: REMOVE_FOLDER, id });
    });
}

export const goToEditFolder = id => dispatch => {
    dispatch({type: GO_TO_EDIT_FOLDER});

    hashHistory.push(`/folder/${id}`);
};
