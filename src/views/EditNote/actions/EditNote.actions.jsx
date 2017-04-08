import { hashHistory } from 'react-router';

import {
  EDIT_EXISTING_NOTE,
  EDIT_EXISTING_NOTE_SUCCESS,
  CREATE_NEW_NOTE,
  CREATE_NEW_NOTE_SUCCESS
} from '../../actionTypes.jsx';

export const editNoteRequest = note => dispatch => {
    dispatch({type: EDIT_EXISTING_NOTE});

    return $.ajax({
      url: `/notes/${note.id}`,
      data: JSON.stringify(note),
      contentType: 'application/json',
      type: 'PUT'
    }).then(response => {
        dispatch({type: EDIT_EXISTING_NOTE_SUCCESS, payload: response});

        hashHistory.push('/');
    });
}

export const createNoteRequest = note => dispatch => {
    dispatch({type: CREATE_NEW_NOTE});

    return $.ajax({
      url: '/note',
      data: JSON.stringify(note),
      contentType: 'application/json',
      type: 'POST'
    }).then(response => {
        dispatch({type: CREATE_NEW_NOTE_SUCCESS, payload: response});

        hashHistory.push('/');
    });
}
