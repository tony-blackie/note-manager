import { baseName, clientID, clientSecret } from '../../app/config';
import axios from 'axios';

export const requestToken = (username, password) => dispatch => {
    const grant_type = 'password';
    const client_id = clientID;
    const client_secret = clientSecret;

    return fetch(`${baseName}/o/token/?grant_type=${grant_type}&username=${username}&password=${password}&client_secret=${client_secret}&client_id=${clientID}`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
        }
    })
    .then(response => response.json())

    // return axios.post(
    //     `${baseName}/o/token/
    //     ?grant_type=${grant_type}
    //     &username=${username}
    //     &password=${password}
    //     &client_secret=${client_secret}
    //     &client_id=${clientID}`
    // )
    .then(response => {
        const token = `${response.token_type} ${response.access_token}`;

        localStorage.setItem('token', token);
    })
    .catch(error => console.log(error));
};