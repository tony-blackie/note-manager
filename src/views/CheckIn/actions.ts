import axios from 'axios';

import { hashHistory } from 'react-router';

import { baseName } from '../../app/config';
import utils from '../../utils';
import { CHANGE_LOGIN, CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_CONFIRM_PASSWORD } from './constants';

export const checkInRequest = credentials => dispatch => {
    return axios.request({
        url: `${baseName}/user/`,
        method: 'POST',
        headers: {
            'Authorization': `${localStorage.getItem('token')}`
        },
        data: credentials
    })
    .then(response => {
        console.log(`user creation response: ${response}`);

        if (response.data) {
          hashHistory.push('/login');
        }
    })
    .catch(error => console.log(`error: ${error}`));
};

export const changeLogin = (login: string) => ({
    type: CHANGE_LOGIN,
    payload: { login }
});

export const changeEmail = (email: string) => ({
    type: CHANGE_EMAIL,
    payload: { email }
});

export const changePassword = (password: string) => ({
    type: CHANGE_PASSWORD,
    payload: { password }
});

export const changeConfirmPassword = (confirmPassword: string) => ({
    type: CHANGE_CONFIRM_PASSWORD,
    payload: { confirmPassword }
});
