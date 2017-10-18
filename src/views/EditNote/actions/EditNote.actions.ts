import { hashHistory } from 'react-router';
import axios from 'axios';

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

export type HandleEditNoteSuccessFn = (NoteType) => TypedAction<any>;

export const handleEditNoteSuccess: HandleEditNoteSuccessFn = response => {
    hashHistory.push('/');

    return ({ type: EDIT_EXISTING_NOTE_SUCCESS, payload: response });
}

export const handleEditNoteFail = error => {
    //hashHistory.push('/');

    return ({ type: CREATE_NEW_NOTE_FAIL, payload: error });
}

export const editNoteRequest = note => dispatch => {
    dispatch({type: EDIT_EXISTING_NOTE});

    return axios.request({
        url:`${baseName}/noe/${note.id}/`,
        method: 'PUT',
        data: note
    })
    .then(response => dispatch(handleEditNoteSuccess(response.data)))
    .catch(error => dispatch(handleEditNoteFail('error, ee')));
}

export const handleSuccessfulNoteCreation = response => {
    hashHistory.push('/');

    return ({ type: CREATE_NEW_NOTE_SUCCESS, payload: response });
};

export const handleFailedNoteCreation = error => {
    //hashHistory.push('/');
    
    return ({ type: CREATE_NEW_NOTE_FAIL, payload: error });
};

export const createNoteRequest = note => dispatch => {
    dispatch({ type: CREATE_NEW_NOTE });

    return axios.request({
        url: `${baseName}/note/`,
        method: 'POST',
        data: note
    })
    .then(response => dispatch(handleSuccessfulNoteCreation(response.data)))
    .catch(error => dispatch(handleFailedNoteCreation('sorry, e')));
}

export const changeTextFieldValue = value => ({
    type: CHANGE_TEXT_FIELD_VALUE,
    payload: { textFieldValue: value }
});

export const changeNoteName = name => ({
    type: CHANGE_NOTE_NAME,
    payload: { name }
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

    return axios.request({
        url: `${baseName}/note/${id}/`,
        method: 'GET'
    })
    .then(response => dispatch(handleSuccessfulNoteResponse(response.data)))
    .catch(error => dispatch(handleFailedNoteResponse(error)));
};

export const clearNoteData = () => ({
    type: CLEAR_NOTE_DATA
});
