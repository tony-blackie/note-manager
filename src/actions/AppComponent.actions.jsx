import {
    ADD_NEW_NOTE,
    GET_ALL_NOTES,
    GO_TO_NOTE_CREATION
} from './actionTypes.jsx';

import { dispatch } from 'react-redux';

export const addNote = () => ({
    type: ADD_NEW_NOTE
});

export const getAllNotes = dispatch => () => {
    dispatch($.get('/notes').then(response => {
        return {
          type: 'GET_ALL_NOTES',
          payload: response
        };
    }));
};

export const goToNoteEdit = id => dispatch => {
    dispatch({type: GO_TO_NOTE_EDIT});

    hashHistory.push(`/notes/:${id}`);
};

export const goToNoteCreation = id => dispatch => {
    dispatch({ type: GO_TO_NOTE_CREATION });

    hashHistory.push(`/notes/:${id}`);
}
