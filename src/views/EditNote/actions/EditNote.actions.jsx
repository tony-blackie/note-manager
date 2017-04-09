import { hashHistory } from 'react-router';

import {
  EDIT_EXISTING_NOTE,
  EDIT_EXISTING_NOTE_SUCCESS,
  EDIT_EXISTING_NOTE_FAIL,
  CREATE_NEW_NOTE,
  CREATE_NEW_NOTE_SUCCESS
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
    .then(response => {
        dispatch({type: EDIT_EXISTING_NOTE_SUCCESS, payload: response});

        hashHistory.push('/');
    })
    .catch(error => {
        //dispatch error
    });
}
