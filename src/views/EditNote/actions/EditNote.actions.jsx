import { hashHistory } from 'react-router';

import {
  EDIT_EXISTING_NOTE,
  EDIT_EXISTING_NOTE_SUCCESS,
  EDIT_EXISTING_NOTE_FAIL,
  CREATE_NEW_NOTE,
  CREATE_NEW_NOTE_SUCCESS,
  CREATE_NEW_NOTE_FAIL,
  CHANGE_TEXT_FIELD_VALUE
} from '../../actionTypes.jsx';

export const handleEditNoteSuccess = response => {
    hashHistory.push('/');

    return ({type: EDIT_EXISTING_NOTE_SUCCESS, payload: response});
}

export const handleEditNoteFail = error => {
    hashHistory.push('/');

    return ({ type: EDIT_EXISTING_NOTE_FAIL, payload: error });
}

export const editNoteRequest = note => dispatch => {
    dispatch({type: EDIT_EXISTING_NOTE});

    return fetch(`/notes/${note.id}`, {
        method: 'PUT',
        body: JSON.stringify(note),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => dispatch(handleEditNoteSuccess(response)))
    .catch(error => dispatch(handleEditNoteFail(error)));
}

export const handleSuccessfulNoteCreation = response => {
    hashHistory.push('/');

    return ({ type: CREATE_NEW_NOTE_SUCCESS, payload: response });
};

export const handleFailedNoteCreation = error => {
    hashHistory.push('/');

    return ({ type: CREATE_NEW_NOTE_FAIL, payload: error });
};

export const createNoteRequest = note => dispatch => {
    dispatch({type: CREATE_NEW_NOTE});

    return fetch(`/note`, {
        method: 'POST',
        body: JSON.stringify(note),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => dispatch(handleSuccessfulNoteCreation(response)))
    .catch(error => dispatch(handleFailedNoteCreation(error)));
}

export const changeTextFieldValue = value => dispatch => (
    dispatch({ type: CHANGE_TEXT_FIELD_VALUE, textFieldValue: value })
);
