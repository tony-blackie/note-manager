import axios from 'axios';

import { hashHistory } from 'react-router';

import { baseName } from '../../app/config';
import utils from '../../utils';
import { CHANGE_LOGIN, CHANGE_EMAIL, CHANGE_PASSWORD, CHANGE_CONFIRM_PASSWORD } from './constants';

export const checkInRequest = formData => dispatch => {
    const credentials = {
        ...formData,
        is_staff: true
    };

    // xsrfHeaderName: 'X-CSRFToken',
    // xsrfCookieName: 'w14oAyTweO9asugkrMnhaELwQw5L2Dfxx8MB3WCLm2FHaePcssHChFGa9QHdRxwT'

    // axios.defaults.withCredentials = true;
    // axios.defaults.xsrfHeaderName = "X-CSRFToken";
    const csrfToken = 'WmKkLOuWkfWgKjIx5rrkeDl5xTuu4J9YCeILlIteV7LEbB2XXJyf1taf5zWRSfN2';

    return axios.request({
        url: `${baseName}/users/`,
        method: 'POST',
        data: credentials,
        headers: {"X-CSRFToken": csrfToken}
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
