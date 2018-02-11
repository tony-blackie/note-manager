import { hashHistory } from 'react-router';
import axios from 'axios';
import utils from '../../../utils';
const { deleteToken } = utils;

import {
    GET_ALL_NOTES,
    GET_ALL_NOTES_SUCCESS,
    GET_ALL_NOTES_FAIL,
    GO_TO_NOTE_CREATION,
    GO_TO_NOTE_EDIT,
    GO_TO_EDIT_HASHTAG,
    REMOVE_NOTE,
    REMOVE_NOTE_SUCCESS,
    REMOVE_NOTE_FAIL,
    MAKE_HASHTAG_ACTIVE,
    MAKE_HASHTAG_INACTIVE,
    REQUEST_ALL_HASHTAGS,
    REQUEST_ALL_HASHTAGS_SUCCESS,
    REQUEST_ALL_HASHTAGS_FAIL,
    REMOVE_HASHTAG_SUCCESS,
    REMOVE_HASHTAG_FAIL,
    GO_TO_HASHTAG_CREATION,
    UPDATE_NOTE_FILTER_QUERY,
} from '../../actionTypes';
import {
    GoToNoteEditFn,
    GoToNoteCreationFn,
    MakeHashtagActiveFn,
    MakeHashtagInactiveFn,
    GetAllHashtagsFn,
    RemoveHashtagFn,
    GoToEditHashtagFn,
    GoToHashtagCreationFn,
    HandleSuccessfulGetAllNotesFn,
    HandleFailedGetAllNotesFn,
    RequestAllNotesFn,
    GetAllNotesFn,
    HandleSuccessfulDeleteHashtagFn,
    HandleSuccessfulDeleteNoteFn,
    HandleFailedDeleteNoteFn,
    RemoveNoteFn,
    HandleSuccessfulGetAllHashtagsFn,
    HandleFailedGetAllHashtagsFn,
    HandleFailedDeleteHashtagFn,
    UpdateNoteFilterQueryFn,
    CreateInitialHashtagFn,
} from '../types';
import { HashtagType, NoteType, TypedAction } from '../../../generic/types';
import { baseName } from '../../../app/config';

export const handleSuccessfulGetAllNotes: HandleSuccessfulGetAllNotesFn = notes => ({
    type: GET_ALL_NOTES_SUCCESS,
    payload: { notes },
});

export const handleFailedGetAllNotes: HandleFailedGetAllNotesFn = error => ({
    type: GET_ALL_NOTES_FAIL,
    payload: { error },
});

export const requestAllNotes: RequestAllNotesFn = () => ({
    type: GET_ALL_NOTES,
});

export const getAllNotes: GetAllNotesFn = () => dispatch => {
    dispatch(requestAllNotes());

    return axios
        .get(`${baseName}/note/`)
        .then(response => dispatch(handleSuccessfulGetAllNotes(response.data)))
        .catch(error => {
            dispatch(handleFailedGetAllNotes(error));

            const { response } = error;

            if (
                response &&
                response.data &&
                response.data.message === 'Login is required'
            ) {
                deleteToken();
                hashHistory.push('/login');
            }
        });
};

export const goToNoteEdit: GoToNoteEditFn = id => dispatch => {
    dispatch({ type: GO_TO_NOTE_EDIT });

    hashHistory.push(`/note/${id}/`);
};

export const goToNoteCreation: GoToNoteCreationFn = () => dispatch => {
    dispatch({ type: GO_TO_NOTE_CREATION });

    hashHistory.push(`/note`);
};

export const handleSuccessfulDeleteNote: HandleSuccessfulDeleteNoteFn = id => ({
    type: REMOVE_NOTE_SUCCESS,
    payload: { id },
});

export const handleFailedDeleteNote: HandleFailedDeleteNoteFn = error => ({
    type: REMOVE_NOTE_FAIL,
    payload: { error },
});

export const removeNote: RemoveNoteFn = id => dispatch => {
    dispatch({ type: REMOVE_NOTE });

    return axios
        .delete(`${baseName}/note/${id}`)
        .then(() => dispatch(handleSuccessfulDeleteNote(id)))
        .catch(error => dispatch(handleFailedDeleteNote(error)));
};

export const makeHashtagActive: MakeHashtagActiveFn = id => dispatch => {
    dispatch({ type: MAKE_HASHTAG_ACTIVE, payload: { id } });
};

export const makeHashtagInactive: MakeHashtagInactiveFn = id => dispatch => {
    dispatch({ type: MAKE_HASHTAG_INACTIVE, payload: { id } });
};

export const handleSuccessfulGetAllHastags: HandleSuccessfulGetAllHashtagsFn = hashtags => ({
    type: REQUEST_ALL_HASHTAGS_SUCCESS,
    payload: { hashtags },
});

export const handleFailedGetAllHashtags: HandleFailedGetAllHashtagsFn = error => ({
    type: REQUEST_ALL_HASHTAGS_FAIL,
    payload: { error },
});

export const getAllHashtags: GetAllHashtagsFn = () => dispatch => {
    dispatch({ type: REQUEST_ALL_HASHTAGS });

    return axios
        .get(`${baseName}/hashtag`)
        .then(response =>
            dispatch(handleSuccessfulGetAllHastags(response.data))
        )
        .catch(error => {
            dispatch(handleFailedGetAllHashtags(error));

            const { response } = error;

            if (
                response &&
                response.data &&
                response.data.message === 'Login is required'
            ) {
                deleteToken();
                hashHistory.push('/login');
            }
        });
};

export const handleSuccessfulDeleteHashtag: HandleSuccessfulDeleteHashtagFn = id => ({
    type: REMOVE_HASHTAG_SUCCESS,
    payload: { id },
});

export const handleFailedDeleteHashtag: HandleFailedDeleteHashtagFn = error => ({
    type: REMOVE_HASHTAG_FAIL,
    payload: { error },
});

export const removeHashtag: RemoveHashtagFn = id => dispatch => {
    return axios
        .delete(`${baseName}/hashtag/${id}`)
        .then(() => dispatch(handleSuccessfulDeleteHashtag(id)))
        .catch(error => dispatch(handleFailedDeleteHashtag(error)));
};

export const goToEditHashtag: GoToEditHashtagFn = id => dispatch => {
    dispatch({ type: GO_TO_EDIT_HASHTAG });

    hashHistory.push(`/hashtag/${id}`);
};

export const goToHashtagCreation: GoToHashtagCreationFn = () => dispatch => {
    dispatch({ type: GO_TO_HASHTAG_CREATION });

    hashHistory.push('/hashtag/');
};

export const updateNoteFilterQuery: UpdateNoteFilterQueryFn = query => ({
    type: UPDATE_NOTE_FILTER_QUERY,
    payload: { query },
});

export const createInitialHashtag: CreateInitialHashtagFn = () => {
    const hashtag = {
        name: 'Initial',
        notes: [],
    };

    return axios
        .request({
            url: `${baseName}/hashtag/`,
            method: 'POST',
            data: hashtag,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
};
