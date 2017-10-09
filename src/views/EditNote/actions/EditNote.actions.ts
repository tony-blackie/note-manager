import { hashHistory } from 'react-router';

import {
  EDIT_EXISTING_NOTE,
  EDIT_EXISTING_NOTE_SUCCESS,
  EDIT_EXISTING_NOTE_FAIL,
  CREATE_NEW_NOTE,
  CREATE_NEW_NOTE_SUCCESS,
  CREATE_NEW_NOTE_FAIL,
  CHANGE_TEXT_FIELD_VALUE,
  CHANGE_NOTE_NAME,
  REQUEST_NOTE_FETCH,
  GET_NOTE_SUCCESS,
  GET_NOTE_FAIL,
  CLEAR_NOTE_DATA
} from '../../actionTypes';
import { baseName } from '../../../app/config';
import { FolderType, NoteType, TypedAction } from '../../../generic/types';

export type handleEditNoteSuccessFn = (NoteType) => TypedAction;

export const handleEditNoteSuccess = response => {
    hashHistory.push('/');

    return ({ type: EDIT_EXISTING_NOTE_SUCCESS, payload: response });
}

export const handleEditNoteFail = error => {
    hashHistory.push('/');

    return ({ type: EDIT_EXISTING_NOTE_FAIL, payload: error });
}

export const editNoteRequest = note => dispatch => {
    dispatch({type: EDIT_EXISTING_NOTE});

    return fetch(`${baseName}/notes/${note.id}/`, {
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
    dispatch({ type: CREATE_NEW_NOTE });

    return fetch(`${baseName}/note`, {
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

export const changeTextFieldValue = value => ({
    type: CHANGE_TEXT_FIELD_VALUE, 
    textFieldValue: value
});

export const changeNoteName = name => ({
    type: CHANGE_NOTE_NAME, 
    name
});

export const handleSuccessfulNoteResponse = response => ({
    type: GET_NOTE_SUCCESS,
    payload: { note: response }
});

export const handleFailedNoteResponse = error => ({
    type: GET_NOTE_FAIL,
    payload: { error: error }
});

export const fetchNote = id => dispatch => {
    dispatch({ type: REQUEST_NOTE_FETCH });

    return fetch(`${baseName}/notes/${id}/`, {
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(response => dispatch(handleSuccessfulNoteResponse(response)))
    .catch(error => dispatch(handleFailedNoteResponse(error)));
};

export const clearNoteData = () => ({
    type: CLEAR_NOTE_DATA
});
