import { hashHistory } from 'react-router';
import axios from 'axios';

import {
    RENAME_HASHTAG,
    GET_HASHTAG,
    GET_HASHTAG_SUCCESS,
    GET_HASHTAG_FAIL,
    CHANGE_HASHTAG_NAME,
    SAVE_EDITED_HASHTAG,
    HANDLE_HASHTAG_EDIT_ERROR,
    REQUEST_HASHTAG_CREATION,
    REQUEST_HASHTAG_EDIT,
    HASHTAG_CREATION_SUCCESS,
    HASHTAG_CREATION_FAIL,
    CLEAR_HASHTAG_NAME,
} from '../../actionTypes';
import {
    EditHashtagFn,
    HandleSuccessfulHashtagEditFn,
    RequestHashtagCreationFn,
    HandleSuccessfulHashtagCreationFn,
    HandleFailedHashtagCreationFn,
    HandleClearFailedHashtagCreationFn,
    HandleSuccessfulGetHashtagFn,
    HandleFailedGetHashtagFn,
    RequestHashtagFn,
    GetHashtagFn,
    HandleHashtagNameChangeFn,
    HandleFailedHashtagEditFn,
    RequestHashtagEditFn,
    CreateNewHashtagFn,
    HandleHashtagNameClearFn,
} from '../types';
import { baseName } from '../../../app/config';

export const requestHashtagCreation: RequestHashtagCreationFn = () => ({
    type: REQUEST_HASHTAG_CREATION,
});

export const handleSuccessfulHashtagCreation: HandleSuccessfulHashtagCreationFn = hashtag => ({
    type: HASHTAG_CREATION_SUCCESS,
    payload: { hashtag },
});

export const handleFailedHashtagCreation: HandleFailedHashtagCreationFn = () => ({
    type: HASHTAG_CREATION_FAIL,
});

export const handleSuccessfulGetHashtag: HandleSuccessfulGetHashtagFn = hashtag => {
    return {
        type: GET_HASHTAG_SUCCESS,
        payload: { hashtag },
    };
};

export const handleFailedGetHashtag: HandleFailedGetHashtagFn = error => ({
    type: GET_HASHTAG_FAIL,
    payload: { error },
});

export const requestHashtag: RequestHashtagFn = () => ({
    type: GET_HASHTAG,
});

export const getHashtag: GetHashtagFn = id => dispatch => {
    dispatch(requestHashtag());

    return axios
        .request({
            url: `${baseName}/hashtag/${id}/`,
            method: 'GET',
        })
        .then(response => dispatch(handleSuccessfulGetHashtag(response.data)))
        .catch(error => dispatch(handleFailedGetHashtag(error)));
};

export const handleHashtagNameChange: HandleHashtagNameChangeFn = text => ({
    type: CHANGE_HASHTAG_NAME,
    payload: { text },
});

export const handleHashtagNameClear: HandleHashtagNameClearFn = () => ({
    type: CLEAR_HASHTAG_NAME,
});

export const handleSuccessfulHashtagEdit: HandleSuccessfulHashtagEditFn = (
    hashtagId,
    hashtagName
) => ({
    type: SAVE_EDITED_HASHTAG,
    payload: { hashtagId, hashtagName },
});

export const handleFailedHashtagEdit: HandleFailedHashtagEditFn = error => ({
    type: HANDLE_HASHTAG_EDIT_ERROR,
    payload: { error },
});

export const requestHashtagEdit: RequestHashtagEditFn = () => ({
    type: REQUEST_HASHTAG_EDIT,
});

export const editHashtag: EditHashtagFn = hashtag => dispatch => {
    dispatch(requestHashtagEdit());

    const { id, name, parent, isRoot, notes } = hashtag;

    return axios
        .request({
            url: `${baseName}/hashtag/${id}/`,
            method: 'PUT',
            data: {
                id,
                name,
                parent,
                is_root: isRoot,
                notes,
            },
        })
        .then(response => {
            const { data } = response;

            dispatch(handleHashtagNameClear());

            dispatch(handleSuccessfulHashtagEdit(data.id, data.name));

            hashHistory.push('/');
        })
        .catch(error => {
            dispatch(handleFailedHashtagEdit(error));

            hashHistory.push('/');
        });
};

export const createNewHashtag: CreateNewHashtagFn = (
    hashtagName,
    activeHashtagId
) => dispatch => {
    dispatch(requestHashtagCreation());

    return axios
        .request({
            url: `${baseName}/hashtag/`,
            method: 'POST',
            data: {
                name: hashtagName,
                is_root: false,
                parent: activeHashtagId,
            },
        })
        .then(response => {
            dispatch(handleSuccessfulHashtagCreation(hashtagName));

            hashHistory.push('/');
        })
        .catch(error => {
            dispatch(handleFailedHashtagCreation());

            //hashHistory.push('/');
        });
};
