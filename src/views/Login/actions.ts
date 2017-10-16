import { baseName, clientID, clientSecret } from '../../app/config';
import axios from 'axios';
import utils from '../../utils';

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