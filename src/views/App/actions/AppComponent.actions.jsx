import {
    GET_ALL_NOTES,
    GET_ALL_NOTES_SUCCESS,
    GO_TO_NOTE_CREATION,
    GO_TO_NOTE_EDIT,
    GO_TO_EDIT_FOLDER,
    REMOVE_NOTE,
    REMOVE_NOTE_SUCCESS,
    MAKE_FOLDER_ACTIVE,
    MAKE_FOLDER_INACTIVE,
    REQUEST_ALL_FOLDERS,
    REQUEST_ALL_FOLDERS_SUCCESS,
    REMOVE_FOLDER,
    GO_TO_FOLDER_CREATION
} from '../../actionTypes.jsx';
import { hashHistory } from 'react-router';

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

export const makeFolderInactive = id => dispatch => {
    dispatch({ type: MAKE_FOLDER_INACTIVE, id });
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

export const goToFolderCreation = () => dispatch => {
    dispatch({ type: GO_TO_FOLDER_CREATION });

    hashHistory.push('/folder');
}
