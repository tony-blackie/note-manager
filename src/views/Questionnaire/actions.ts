import { getToken } from '../../utils/getToken';
import { Dispatch } from 'redux';
import axios from 'axios';

import { hashHistory } from 'react-router';

import { baseName } from '../../app/config';

import { CHANGE_MSG, CHANGE_FIELD, RESET_FIELDS } from './constants';

export const changeMessage = (message: string) => ({
    type: CHANGE_MSG,
    payload: { message }
});

export const changeCheckbox = (field: string) => ({
    type: CHANGE_FIELD,
    payload: { field }
});

export const changeStatus = (field: string) => ({
    type: CHANGE_FIELD,
    payload: { field }
});

export const questionnaireRequest = () => (dispatch, getState) => {
    let currentState = getState().questionnaire;
    const questionnaire = {
        color: currentState.colors,
        hashtag: currentState.hashtags,
        i18n: currentState.i18n,
        importance: currentState.importance,
        text: currentState.message
    };
    
    return axios.request({
        url: `${baseName}/questionnaire/`,
        method: 'POST',
        headers: {'Authorization' : getToken()},
        data: questionnaire
    })
    .then(response => { 
        if (response.status === 200) {
            dispatch(changeStatus('succes'));
        } else {
            dispatch(changeStatus('serverError'));
        }
     })
    .catch(error => {
        console.log(`error: ${error}`);
        dispatch(changeStatus('serverError'));
    });
}

export const backToMain = () => {
    hashHistory.push('/');
    return {
        type: RESET_FIELDS
    }
}