import axios from 'axios';

import { baseName, clientID, clientSecret } from '../../app/config';
import utils from '../../utils';
import { CHANGE_LOGIN, CHANGE_PASSWORD } from './constants';

 const { setToken } = utils;

export const requestToken = (username, password) => dispatch => {
    const grant_type = 'password';
    const client_id = clientID;
    const client_secret = clientSecret;

    return axios.request({
        url: `${baseName}/o/token/`,
        method: 'POST',
        params: {
            grant_type,
            username,
            password,
            client_secret,
            client_id
        }
    })
    .then(response => {
        const { token_type, access_token } = response.data;

        const token = `${token_type} ${access_token}`;

        setToken(token);
    })
    .catch(error => console.log(error));
};

export const changeLogin = (login: string) => ({
    type: CHANGE_LOGIN,
    payload: { login }
});

export const changePassword = (password: string) => ({
    type: CHANGE_PASSWORD,
    payload: { password }
});