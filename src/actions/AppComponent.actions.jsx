import {
    GET_ALL_NOTES,
    GET_ALL_NOTES_SUCCESS,
    GO_TO_NOTE_CREATION,
    GO_TO_NOTE_EDIT,
    REMOVE_NOTE,
    REMOVE_NOTE_SUCCESS
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
