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
  CLEAR_NOTE_DATA,
  CLEAR_ERROR_MESSAGE
} from '../../actionTypes';
import { baseName } from '../../../app/config';
import { FolderType, NoteType, TypedAction, TypedActionNoPayload } from '../../../generic/types';
import { ChangeTextFieldValueFn } from '../types';

export type HandleEditNoteSuccessFn = (NoteType) => TypedAction<any>;

export const handleEditNoteSuccess: HandleEditNoteSuccessFn = response => {
    hashHistory.push('/');

    return ({ type: EDIT_EXISTING_NOTE_SUCCESS, payload: response });
}

export const handleEditNoteFail = (): TypedActionNoPayload => {
    return ({ type: CREATE_NEW_NOTE_FAIL });
}

export const handleClearErrorMessage = (): TypedActionNoPayload => {
    return ({ type: CLEAR_ERROR_MESSAGE });
}

export const editNoteRequest = (note: NoteType) => dispatch => {
    dispatch({ type: EDIT_EXISTING_NOTE });

    note = {
        ...note,
        hashtagsToAdd: [
            { id: 53, name: 'initial' },
            { id: 54, name: 'chloe' },
            { id: 55, name: 'rachel' }
        ],
        allHashtags: [
            { id: 1, name: 'initial' },
            { id: 2, name: 'chloe' },
            { id: 13, name: 'rachel' },
            { name: 'arcadia bay' }
        ]
    } as any;

    // return axios.request({
    //     url:`${baseName}/note/${note.id}/`,
    //     method: 'PUT',
    //     data: note
    // })
    // .then(response => dispatch(handleEditNoteSuccess(response.data)))
    // .catch(error => dispatch(handleEditNoteFail()));
}

export const handleSuccessfulNoteCreation = response => {
    hashHistory.push('/');

    return ({ type: CREATE_NEW_NOTE_SUCCESS, payload: response });
};

export const handleFailedNoteCreation = () => {
    return ({ type: CREATE_NEW_NOTE_FAIL });
};

export const createNoteRequest = (note: NoteType, activeFolderId: number) => dispatch => {
    dispatch({ type: CREATE_NEW_NOTE });

    /* TODO: Remove hardcode */

    // return axios.request({
    //     url: `${baseName}/note/`,
    //     method: 'POST',
    //     data: {
    //         ...note,
    //         hashtagsToAdd: [
    //             { id: 2, name: 'chloe' },
    //             { name: 'arcadia bay' }
    //         ],
    //         allHashtags: [
    //             { id: 1, name: 'initial' },
    //             { id: 2, name: 'chloe' },
    //             { id: 13, name: 'rachel' },
    //             { id: 14, name: 'max' },
    //             { name: 'arcadia bay' }
    //         ]
    //     }
    // })
    // .then(response => dispatch(handleSuccessfulNoteCreation(response.data)))
    // .catch(error => dispatch(handleFailedNoteCreation()));
}

export const changeTextFieldValue: ChangeTextFieldValueFn = value => ({
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
